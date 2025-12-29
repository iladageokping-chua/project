const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../users.json');

// เพิ่ม priority ในการเพิ่ม Task
exports.addTask = (req, res) => {
  const { name, goal, date, notes, priority } = req.body; // รับ priority
  if (!name || !goal || !date) {
    return res.status(400).send('Task data is required');
  }

  if (isNaN(Date.parse(date))) {
    return res.status(400).send('Invalid date format');
  }

  const user = req.session.user;
  if (!user) return res.redirect('/login');
  
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    if (!currentUser) return res.status(404).send('User not found');

    // Ensure tasks array is initialized
    if (!currentUser.tasks) {
      currentUser.tasks = [];
      
    }

    const newTask = {
      id: Date.now(),
      name,
      goal,
      date,
      notes,
      priority: priority || 0, // Set default priority if not provided
      status: 'not_done'
    };

    currentUser.tasks.push(newTask);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Error saving task');
      res.redirect('/list');
    });
  });
};


// แก้ไขการลบหลาย tasks ตาม id แทน name
exports.deleteMultipleTasks = (req, res) => {
  const { taskIds } = req.body; // Array of task ids to delete

  // Validate taskIds
  if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
    return res.status(400).send('No tasks specified for deletion');
  }

  const user = req.session.user;
  if (!user) return res.redirect('/login');

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    if (!currentUser || !currentUser.tasks) return res.redirect('/list');
    
    currentUser.tasks = currentUser.tasks.filter(task => !taskIds.includes(task.id));

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Error saving tasks');
      res.redirect('/');
    });
  });
};


// ห้ามเปลี่ยน username ใน updateProfile
exports.updateProfile = (req, res) => {
  const { username, phone, birthday, gender } = req.body;

  // Validate input data
  if (!username || !phone || isNaN(Date.parse(birthday)) || !['male', 'female', 'other'].includes(gender)) {
    return res.status(400).send('Invalid input data'); // Return 400 for invalid input
  }

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).send('User not found');

    // ป้องกันการเปลี่ยน username
    if (username !== user.username) {
      return res.status(400).send('You cannot change your username');
    }

    Object.assign(user, { phone, birthday, gender });
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Error saving user data');
      req.session.user = { ...user, password: undefined }; // Update session
      res.redirect('/profile');
    });
  });
};

// ฟังก์ชัน getTasks: ดึงข้อมูล Task ทั้งหมดของผู้ใช้
exports.getTasks = (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    res.render('list', { tasks: currentUser?.tasks || [] });
  });
};

// แก้ไข Task
exports.editTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { name, goal, date, notes } = req.body;

  if (!name || !goal || isNaN(Date.parse(date))) {
    return res.status(400).send('Invalid input data');
  }

  const user = req.session.user;
  if (!user) return res.redirect('/login');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    if (!currentUser || !currentUser.tasks) return res.status(404).send('Task not found');
    const task = currentUser?.tasks?.find(t => t.id === taskId);
    if (!task) return res.status(404).send('Task not found');
    Object.assign(task, { name, goal, date, notes });
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Error saving task');
      res.redirect('/list');
    });
  });
};

// แสดงหน้า Edit Task
exports.renderEditTaskPage = (req, res) => {
  const taskId = parseInt(req.params.id);
  const user = req.session.user;
  if (!user) return res.redirect('/login');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    if (!currentUser || !currentUser.tasks) return res.status(404).send('User or tasks not found');
    const task = currentUser.tasks.find(t => t.id === taskId);
    if (!task) return res.status(404).send('Task not found');
    res.render('edit-task', { task });
  });
};

// ลบ Task
exports.deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const user = req.session.user;
  if (!user) return res.redirect('/login');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    if (!currentUser) return res.status(404).send('User not found'); // Add this check
    const taskIndex = currentUser.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return res.status(404).send('Task not found'); // Add this check
    currentUser.tasks.splice(taskIndex, 1); // Remove the task
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Error saving task');
      res.redirect('/list');
    });
  });
};

// ค้นหา Task ตามชื่อ
exports.searchTasksByName = (req, res) => {
  const { searchName } = req.body;
  const user = req.session.user;
  if (!user) return res.redirect('/login');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    if (!currentUser || !currentUser.tasks) return res.redirect('/list');
    const foundTasks = currentUser.tasks.filter(task =>
      task.name.toLowerCase().includes(searchName.toLowerCase())
    );
    res.render('list', { tasks: foundTasks });
  });
};

// การอัปเดตสถานะ Task
exports.updateTaskStatus = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { status } = req.body;

  if (!['done', 'not_done'].includes(status)) {
    return res.status(400).send('Invalid status');
  }

  const user = req.session.user;
  if (!user) return res.redirect('/login');
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');
    const users = JSON.parse(data);
    const currentUser = users.find(u => u.username === user.username);
    if (!currentUser || !currentUser.tasks) return res.redirect('/list');
    const task = currentUser.tasks.find(t => t.id === taskId);
    if (!task) return res.status(404).send('Task not found');
    task.status = status; // Update the task status
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Error saving task');
      res.redirect('/list');
    });
  });
};
