const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const usersFilePath = path.resolve(__dirname, '../users.json');

// Show login page
exports.showLoginPage = (req, res) => {
  res.render('login', { error: req.query.error || null });
};

// Handle login
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('login', { error: 'Please enter both username and password' });
  }

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');

    let users;
    try {
      users = JSON.parse(data || '[]');
    } catch (parseError) {
      return res.status(500).send('Error parsing user data');
    }

    const user = users.find(u => u.username === username);
    if (!user) return res.render('login', { error: 'Username not found' });

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).send('Error verifying password');
      if (!match) return res.render('login', { error: 'Incorrect password' });

      // Set session but exclude sensitive info
      const { password, ...userWithoutPassword } = user;
      req.session.user = userWithoutPassword;

      res.redirect('/workout_tracker');
    });
  });
};

// Handle signup
exports.signup = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format');
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
      if (err && err.code !== 'ENOENT') return res.status(500).send('Error reading user data');

      let users;
      try {
        users = data ? JSON.parse(data) : [];
      } catch (parseError) {
        return res.status(500).send('Error parsing user data');
      }

      if (users.find(u => u.username === username || u.email === email)) {
        return res.status(400).send('Username or Email already exists');
      }

      users.push({
        username,
        email,
        password: hashedPassword,
        image: '/images/default-profile.png',
        phone: '',
        birthday: '',
        gender: '',
      });

      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
        if (err) return res.status(500).send('Error saving user data');
        res.redirect('/login');
      });
    });
  });
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

// Update profile
exports.updateProfile = (req, res) => {
  const { username, phone, birthday, gender } = req.body;

  if (!username || !phone || isNaN(Date.parse(birthday)) || !['male', 'female', 'other'].includes(gender)) {
    return res.status(400).send('Invalid input data');
  }

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading user data');

    let users;
    try {
      users = JSON.parse(data || '[]');
    } catch (parseError) {
      return res.status(500).send('Error parsing user data');
    }

    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).send('User not found');

    Object.assign(user, { phone, birthday, gender });

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).send('Error saving user data');

      // Update session info without password
      const { password, ...userWithoutPassword } = user;
      req.session.user = userWithoutPassword;

      res.redirect('/profile');
    });
  });
};
