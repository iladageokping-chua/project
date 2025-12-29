const express = require('express');
const session = require('express-session');
const path = require('path');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');
const calendarController = require('./controllers/calendarController');
const fs = require('fs');
const multer = require('multer');
const taskRoutes = require('./models/taskRoutes'); // Ensure taskRoutes is imported

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/login', userController.showLoginPage);
app.post('/login', userController.login);
app.get('/signup', (req, res) => res.render('signup'));
app.post('/signup', userController.signup);
app.get('/logout', userController.logout);
app.get('/profile', (req, res) => {
  const successMessage = req.query.success || null; // Added success message
  res.render('profile', { user: req.session.user, successMessage });
});
app.post('/profile/update', userController.updateProfile);

app.post('/profile/upload', upload.single('profileImage'), (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');

    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    if (!currentUser) return res.status(404).send('User not found');

    // Update user's profile image path
    currentUser.image = `/uploads/${req.file.filename}`;
    fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Error saving user data');
      req.session.user.image = currentUser.image; // Update session
      res.redirect('/profile?success=Profile image updated successfully');
    });
  });
});

app.get('/list', taskController.getTasks);
app.post('/add-task', taskController.addTask);
app.post('/edit-task/:id', taskController.editTask);
app.post('/delete-task/:id', taskController.deleteTask);
app.post('/update-status/:id', taskController.updateTaskStatus);

app.get('/calendar', calendarController.getCalendar);

app.get('/workout_tracker', (req, res) => {
  if (!req.session.user) return res.redirect('/login'); // Ensure user is logged in
  res.render('workout_tracker', { user: req.session.user }); // Render the workout_tracker view
});

app.get('/workout', (req, res) => {
  if (!req.session.user) return res.redirect('/login'); // Ensure user is logged in
  res.render('workout', { user: req.session.user }); // Render the workout view
});

app.get('/add-task', (req, res) => {
  if (!req.session.user) return res.redirect('/login'); // Ensure user is logged in
  res.render('add-task', { user: req.session.user }); // Render the add-task view
});

app.get('/Goal_Progress', (req, res) => {
  if (!req.session.user) return res.redirect('/login'); // Ensure user is logged in
  res.render('Goal_Progress', { user: req.session.user }); // Render the Goal_Progress view
});

app.get('/bmi', (req, res) => {
  if (!req.session.user) return res.redirect('/login'); // Ensure user is logged in
  res.render('bmi', { user: req.session.user }); // Render the BMI view
});

app.get('/bmi/history/:username', (req, res) => {
  const { username } = req.params;

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read user data' });

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ bmiHistory: user.bmiHistory || [] });
  });
});

app.post('/bmi/save', (req, res) => {
  const { age, gender, weight, height, bmi, status } = req.body;
  const username = req.session.user?.username;

  if (!username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user data:', err);
      return res.status(500).json({ error: 'Failed to read user data' });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bmiEntry = {
      age,
      gender,
      weight,
      height,
      bmi,
      status,
      date: new Date().toISOString()
    };

    if (!user.bmiHistory) {
      user.bmiHistory = [];
    }

    user.bmiHistory.push(bmiEntry);

    fs.writeFile('users.json', JSON.stringify(users, null, 2), err => {
      if (err) {
        console.error('Error saving user data:', err);
        return res.status(500).json({ error: 'Failed to save BMI data' });
      }

      res.json({ message: 'BMI data saved successfully' });
    });
  });
});

app.get('/goals/:username', (req, res) => {
  const { username } = req.params;

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read user data' });

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ goals: user.tasks || [] });
  });
});

app.get('/calendar/goals/:username', (req, res) => {
  const { username } = req.params;

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read user data' });

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ goals: user.tasks || [] });
  });
});

app.use('/', taskRoutes); // Ensure taskRoutes is used

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






