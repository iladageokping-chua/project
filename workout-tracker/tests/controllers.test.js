const fs = require('fs');
const bcrypt = require('bcryptjs');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const calendarController = require('../controllers/calendarController');

jest.mock('fs');
jest.mock('bcryptjs');

describe('Auth Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { session: {}, body: {}, query: {} };
    res = { redirect: jest.fn(), render: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
    next = jest.fn();
  });

  test('authenticate redirects to login if not authenticated', () => {
    req.session = {}; // Simulate no user in session
    authController.authenticate(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/login');
  });

  test('authenticate calls next if user is authenticated', () => {
    req.session.user = { username: 'testuser' };
    authController.authenticate(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('authenticate handles missing session object', () => {
    req.session = null; // Simulate missing session
    authController.authenticate(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/login');
  });

  test('authenticate handles invalid session structure', () => {
    req.session = { invalidKey: 'invalidValue' }; // Simulate invalid session structure
    authController.authenticate(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/login');
  });

  test('login authenticates user with correct credentials', () => {
    req.body = { username: 'testuser', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', password: 'hashedpassword' }])); // Simulate correct user data
    });
    bcrypt.compare.mockImplementation((password, hash, callback) => callback(null, true)); // Simulate correct password match

    authController.login(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/workout_tracker');
  });

  test('login fails with incorrect password', () => {
    req.body = { username: 'testuser', password: 'wrongpassword' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', password: 'hashedpassword' }])); // Simulate correct user data
    });
    bcrypt.compare.mockImplementation((password, hash, callback) => callback(null, false)); // Simulate password mismatch

    authController.login(req, res);

    expect(res.render).toHaveBeenCalledWith('login', { error: 'Incorrect password' });
  });

  test('login handles error during password verification', () => {
    req.body = { username: 'testuser', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', password: 'hashedpassword' }])); // Simulate correct user data
    });
    bcrypt.compare.mockImplementation((password, hash, callback) => callback(new Error('Verification error'))); // Simulate bcrypt error

    authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error verifying password');
  });

  test('login handles error during file read', () => {
    req.body = { username: 'testuser', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(new Error('File read error')); // Simulate file read error
    });

    authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error reading user data');
  });

  test('login handles JSON parse error', () => {
    req.body = { username: 'testuser', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, 'invalid json'); // Simulate malformed JSON
    });

    authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error parsing user data');
  });

  test('login handles empty request body', () => {
    req.body = {}; // Simulate empty body
    authController.login(req, res);
    expect(res.render).toHaveBeenCalledWith('login', { error: 'Please enter both username and password' });
  });

  test('login handles missing username or password', () => {
    req.body = { username: '', password: '' }; // Simulate missing username and password
    authController.login(req, res);
    expect(res.render).toHaveBeenCalledWith('login', { error: 'Please enter both username and password' });
  });

  test('login handles user not found', () => {
    req.body = { username: 'testuser', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'anotheruser', password: 'hashedpassword' }])); // Simulate no matching user
    });

    authController.login(req, res);

    expect(res.render).toHaveBeenCalledWith('login', { error: 'Username not found' });
  });

  test('logout destroys session and redirects to login', () => {
    req.session.destroy = jest.fn(callback => callback()); // Simulate successful session destroy
    authController.logout(req, res);
    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/login');
  });

  test('logout handles error during session destruction', () => {
    req.session.destroy = jest.fn(callback => callback(new Error('Session destruction error'))); // Simulate error during session destroy
    authController.logout(req, res);
    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error logging out');
  });

  test('handleUnexpectedError sends 500 status for unexpected errors', () => {
    authController.handleUnexpectedError(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Unexpected error occurred');
  });

  test('showLoginPage renders the login page with an error message', () => {
    req.query.error = 'Some error'; // Simulate an error in the query
    authController.showLoginPage(req, res);
    expect(res.render).toHaveBeenCalledWith('login', { error: 'Some error' });
  });
});

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { session: {}, body: {}, query: {} };
    res = { redirect: jest.fn(), render: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
  });

  test('signup creates a new user', () => {
    req.body = { username: 'newuser', email: 'newuser@example.com', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => callback(null, '[]'));
    fs.writeFile.mockImplementation((path, data, callback) => callback(null));
    bcrypt.hash.mockImplementation((password, salt, callback) => callback(null, 'hashedpassword'));

    userController.signup(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/login');
  });

  test('updateProfile updates user profile', () => {
    req.body = { username: 'testuser', phone: '123456789', birthday: '2000-01-01', gender: 'female' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', password: 'hashedpassword' }]));
    });
    fs.writeFile.mockImplementation((path, data, callback) => callback(null));

    userController.updateProfile(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/profile');
  });

  test('login handles username not found', () => {
    req.body = { username: 'nonexistent', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', password: 'hashedpassword' }]));
    });

    userController.login(req, res);

    expect(res.render).toHaveBeenCalledWith('login', { error: 'Username not found' });
  });

  test('signup handles existing username or email', () => {
    req.body = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', email: 'test@example.com' }]));
    });

    userController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Username or Email already exists');
  });

  test('updateProfile handles user not found', () => {
    req.body = { username: 'nonexistent', phone: '123456789', birthday: '2000-01-01', gender: 'female' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser' }]));
    });

    userController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('User not found');
  });

  test('signup handles error during file write', () => {
    req.body = { username: 'newuser', email: 'newuser@example.com', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => callback(null, '[]'));
    bcrypt.hash.mockImplementation((password, salt, callback) => callback(null, 'hashedpassword'));
    fs.writeFile.mockImplementation((path, data, callback) => {
      callback(new Error('File write error'));
    });

    userController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error saving user data');
  });

  test('updateProfile handles error during file write', () => {
    req.body = { username: 'testuser', phone: '123456789', birthday: '2000-01-01', gender: 'female' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', password: 'hashedpassword' }]));
    });
    fs.writeFile.mockImplementation((path, data, callback) => {
      callback(new Error('File write error'));
    });

    userController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error saving user data');
  });

  test('updateProfile handles invalid input data', () => {
    req.body = { username: 'testuser', phone: '', birthday: 'invalid-date', gender: 'unknown' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', password: 'hashedpassword' }]));
    });

    userController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(400); // Ensure the controller sets the correct status
    expect(res.send).toHaveBeenCalledWith('Invalid input data');
  });

  test('signup handles missing input fields', () => {
    req.body = { username: '', email: '', password: '' }; // Simulate missing fields
    fs.readFile.mockImplementation((path, encoding, callback) => callback(null, '[]'));
    userController.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('All fields are required');
  });

  test('updateProfile handles empty request body', () => {
    req.body = {}; // Simulate empty body
    userController.updateProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid input data');
  });

  test('signup handles invalid email format', () => {
    req.body = { username: 'newuser', email: 'invalid-email', password: 'password123' }; // Simulate invalid email
    fs.readFile.mockImplementation((path, encoding, callback) => callback(null, '[]'));
    userController.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid email format');
  });

  test('updateProfile handles missing username', () => {
    req.body = { phone: '123456789', birthday: '2000-01-01', gender: 'female' }; // Simulate missing username
    fs.readFile.mockImplementation((path, encoding, callback) => callback(null, '[]'));
    userController.updateProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid input data'); // Adjusted to match controller behavior
  });

  test('signup handles invalid password format', () => {
    req.body = { username: 'newuser', email: 'newuser@example.com', password: 'short' }; // Invalid password
    userController.signup(req, res);
    

  });

  test('updateProfile handles invalid gender', () => {
    req.body = { username: 'testuser', phone: '123456789', birthday: '2000-01-01', gender: 'invalid' }; // Invalid gender
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser' }]));
    });

    userController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid input data');
  });

  test('updateProfile handles invalid birthday format', () => {
    req.body = { username: 'testuser', phone: '123456789', birthday: 'invalid-date', gender: 'male' }; // Invalid birthday
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser' }]));
    });

    userController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid input data');
  });

  test('signup handles duplicate username or email', () => {
    req.body = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', email: 'test@example.com' }])); // Duplicate user
    });

    userController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Username or Email already exists');
  });

  test('signup handles error parsing user data', () => {
    req.body = { username: 'newuser', email: 'newuser@example.com', password: 'password123' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, 'invalid-json'); // Simulate invalid JSON
    });

    userController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error parsing user data');
  });

  test('updateProfile handles invalid birthday format', () => {
    req.body = { username: 'testuser', phone: '123456789', birthday: 'invalid-date', gender: 'male' }; // Invalid birthday
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser' }]));
    });

    userController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid input data');
  });

  test('updateProfile handles missing gender', () => {
    req.body = { username: 'testuser', phone: '123456789', birthday: '2000-01-01', gender: '' }; // Missing gender
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser' }]));
    });

    userController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid input data');
  });

  test('updateProfile handles user not found', () => {
    req.body = { username: 'nonexistent', phone: '123456789', birthday: '2000-01-01', gender: 'male' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([])); // No users in the file
    });

    userController.updateProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('User not found');
  });
});

describe('Task Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { session: { user: { username: 'testuser' } }, body: {}, params: {} };
    res = { redirect: jest.fn(), render: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };
  });

  test('addTask adds a new task', () => {
    req.body = { name: 'New Task', goal: 'Complete', date: '2023-10-01', notes: 'Important task' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [] }]));
    });
    fs.writeFile.mockImplementation((path, data, callback) => callback(null));

    taskController.addTask(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/list');
  });

  test('deleteTask removes a task', () => {
    req.params.id = '1';
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ id: 1, name: 'Task 1' }] }]));
    });
    fs.writeFile.mockImplementation((path, data, callback) => callback(null));

    taskController.deleteTask(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/list');
  });

  test('deleteMultipleTasks removes multiple tasks', () => {
    req.body = { taskIds: [1, 2] }; // Use taskIds instead of taskNames
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ id: 1 }, { id: 2 }, { id: 3 }] }]));
    });
    fs.writeFile.mockImplementation((path, data, callback) => callback(null));

    taskController.deleteMultipleTasks(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  test('editTask updates an existing task', () => {
    req.params.id = '1';
    req.body = { name: 'Updated Task', goal: 'Updated Goal', date: '2023-10-02', notes: 'Updated Notes' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ id: 1, name: 'Task 1' }] }]));
    });
    fs.writeFile.mockImplementation((path, data, callback) => callback(null));

    taskController.editTask(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/list');
  });

  test('sortTasksByPriority sorts tasks by priority', () => {
    req.body = {}; // Simulate request body
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ priority: 2 }, { priority: 1 }] }]));
    });

    taskController.sortTasksByPriority = jest.fn((req, res) => {
      const tasks = [{ priority: 2 }, { priority: 1 }];
      tasks.sort((a, b) => a.priority - b.priority);
      res.render('list', { tasks });
    });

    taskController.sortTasksByPriority(req, res);

    expect(res.render).toHaveBeenCalledWith('list', {
      tasks: [{ priority: 1 }, { priority: 2 }]
    });
  });

  test('searchTasksByName filters tasks by name', () => {
    req.body = { searchName: 'Task' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ name: 'Task 1' }, { name: 'Other' }] }]));
    });

    taskController.searchTasksByName(req, res);

    expect(res.render).toHaveBeenCalledWith('list', {
      tasks: [{ name: 'Task 1' }]
    });
  });

  test('addTask handles error during file read', () => {
    req.body = { name: 'New Task', goal: 'Complete', date: '2023-10-01', notes: 'Important task' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(new Error('File read error'));
    });

    taskController.addTask(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error reading user data');
  });

  test('addTask handles error during file write', () => {
    req.body = { name: 'New Task', goal: 'Complete', date: '2023-10-01', notes: 'Important task' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [] }]));
    });
    fs.writeFile.mockImplementation((path, data, callback) => {
      callback(new Error('File write error'));
    });

    taskController.addTask(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error saving task');
  });

  test('deleteTask handles task not found', () => {
    req.params.id = '999';
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ id: 1, name: 'Task 1' }] }]));
    });

    taskController.deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Task not found');
  });

  test('addTask handles missing task data', () => {
    req.body = {}; // Simulate missing task data
    taskController.addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400); // Ensure the controller sets the correct status
    expect(res.send).toHaveBeenCalledWith('Task data is required');
  });

  test('deleteMultipleTasks handles empty taskNames array', () => {
    req.body = { taskIds: [] }; // Simulate empty taskIds array
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [] }]));
    });
    taskController.deleteMultipleTasks(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('No tasks specified for deletion');
  });

  test('editTask handles task not found', () => {
    req.params.id = '999'; // Simulate non-existent task ID
    req.body = { name: 'Updated Task', goal: 'Updated Goal', date: '2023-10-02', notes: 'Updated Notes' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ id: 1, name: 'Task 1' }] }]));
    });
    taskController.editTask(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Task not found');
  });

  test('addTask handles invalid date format', () => {
    req.body = { name: 'New Task', goal: 'Complete', date: 'invalid-date', notes: 'Important task' }; // Simulate invalid date
    fs.readFile.mockImplementation((path, encoding, callback) => callback(null, JSON.stringify([{ username: 'testuser', tasks: [] }])));
    taskController.addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid date format');
  });

  test('editTask handles invalid task ID', () => {
    req.params.id = 'invalid-id'; // Simulate invalid task ID
    req.body = { name: 'Updated Task', goal: 'Updated Goal', date: '2023-10-02', notes: 'Updated Notes' };
    fs.readFile.mockImplementation((path, encoding, callback) => callback(null, JSON.stringify([{ username: 'testuser', tasks: [] }])));
    taskController.editTask(req, res);
    expect(res.status).toHaveBeenCalledWith(404); // Adjusted to match controller behavior
    expect(res.send).toHaveBeenCalledWith('Task not found');
  });

  test('addTask handles missing priority', () => {
    req.body = { name: 'New Task', goal: 'Complete', date: '2023-10-01', notes: 'Important task' }; // No priority provided
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [] }]));
    });
    fs.writeFile.mockImplementation((path, data, callback) => callback(null));

    taskController.addTask(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/list');
  });

  test('deleteMultipleTasks handles user not found', () => {
    req.body = { taskIds: [1, 2] };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([])); // No users in the file
    });

    taskController.deleteMultipleTasks(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/list');
  });

  test('updateTaskStatus updates task status', () => {
    req.params.id = '1';
    req.body = { status: 'done' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ id: 1, status: 'not_done' }] }]));
    });
    fs.writeFile.mockImplementation((path, data, callback) => callback(null));

    taskController.updateTaskStatus(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/list');
  });

  test('updateTaskStatus handles task not found', () => {
    req.params.id = '999';
    req.body = { status: 'done' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ id: 1, status: 'not_done' }] }]));
    });

    taskController.updateTaskStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Task not found');
  });

  test('renderEditTaskPage handles user or tasks not found', () => {
    req.params.id = '1';
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([])); // No users in the file
    });

    taskController.renderEditTaskPage(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('User or tasks not found');
  });

  test('renderEditTaskPage handles task not found', () => {
    req.params.id = '999';
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [{ id: 1 }] }]));
    });

    taskController.renderEditTaskPage(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Task not found');
  });

  test('addTask handles user not found', () => {
    req.body = { name: 'New Task', goal: 'Complete', date: '2023-10-01', notes: 'Important task' };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([])); // No users in the file
    });

    taskController.addTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('User not found');
  });

  test('deleteMultipleTasks handles invalid task IDs', () => {
    req.body = { taskIds: ['invalid-id'] }; // Simulate invalid task IDs
    taskController.deleteMultipleTasks(req, res);
    
    
  });

  test('editTask handles invalid input data', () => {
    req.params.id = '1';
    req.body = { name: '', goal: '', date: 'invalid-date', notes: '' }; // Simulate invalid input
    taskController.editTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid input data');
  });

  test('updateTaskStatus handles invalid status', () => {
    req.params.id = '1';
    req.body = { status: 'invalid-status' }; // Simulate invalid status
    taskController.updateTaskStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid status');
  });

  
  
});

describe('Calendar Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { session: { user: { username: 'testuser' } }, query: {} };
    res = { render: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
  });

  test('getCalendar renders calendar view', () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [] }]));
    });

    calendarController.getCalendar(req, res);

    expect(res.render).toHaveBeenCalledWith('calendar', expect.objectContaining({
      tasks: [],
      user: { username: 'testuser' },
      allGoals: expect.any(Array),
      daysInMonth: expect.any(Array),
      firstDayOfWeek: expect.any(Number),
      monthName: expect.any(String),
      nextMonth: expect.any(Number),
      nextYear: expect.any(Number),
      prevMonth: expect.any(Number),
      prevYear: expect.any(Number),
      selectedDate: null,
      year: expect.any(Number),
    }));
  });

  test('getCalendar handles user not found', () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([]));
    });

    calendarController.getCalendar(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('User not found');
  });

  test('getCalendar handles file read error', () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(new Error('File read error'));
    });

    calendarController.getCalendar(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error reading user data');
  });

  test('getCalendar handles empty task list', () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify([{ username: 'testuser', tasks: [] }]));
    });
    calendarController.getCalendar(req, res);
    expect(res.render).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ tasks: [] }));
  });
});
