const fs = require('fs');
const bcrypt = require('bcryptjs'); // Use bcryptjs for password handling

// Middleware to check authentication
exports.authenticate = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Handle logout
exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send('Error logging out');
      } else {
        res.redirect('/login');
      }
    });
  } else {
    res.redirect('/login');
  }
};

// Handle unexpected error
exports.handleUnexpectedError = (req, res) => {
  try {
    throw new Error('Unexpected error');
  } catch (error) {
    res.status(500).send('Unexpected error occurred');
  }
};

// Show login page
exports.showLoginPage = (req, res) => {
  res.render('login', { error: req.query.error || null });
};

// Handle login
exports.login = (req, res) => {
  const { username, password } = req.body;

  // ✅ Validate if username and password are provided
  if (!username || !password) {
    return res.render('login', { error: 'Please enter both username and password' });
  }

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading user data');
    }

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).send('Error parsing user data');
    }

    const user = users.find(u => u.username === username);

    if (user) {
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          return res.status(500).send('Error verifying password');
        }
        if (match) {
          req.session.user = { username: user.username };
          res.redirect('/workout_tracker');
        } else {
          res.render('login', { error: 'Incorrect password' });
        }
      });
    } else {
      res.render('login', { error: 'Username not found' });
    }
  });
};
