//1. Зареждане на библиотеки и .env
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//2. Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 } // 30 мин.
}));
app.use(express.static(path.join(__dirname, 'public')));

//3. In-memory „база данни“ за потребители
const users = [
  { id: 1, username: 'stefi', password: 'password123' },
  { id: 2, username: 'leo', password: 'qwerty' }
];

//4. Middleware за защита на изискващи login страници
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// 5. Маршрути

// 5.1 GET /register
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/register.html'));
});

// 5.2 POST /register
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.redirect('/register?error=This%20user%20already%20exists');
  }
  users.push({ id: users.length + 1, username, password });
  res.redirect('/login?success=Registration%20successful');
});

// 5.3 GET /login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/login.html'));
});

// 5.4 POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.redirect('/login?error=Wrong%20username%20or%20password');
  }
  req.session.userId = user.id;
  res.redirect('/dashboard');
});

// 5.5 GET /dashboard (защитен)
app.get('/dashboard', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '/views/dashboard.html'));
});

// 5.6 GET /logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/dashboard?error=Error%20during%20logout');
    }
    res.redirect('/login?success=You%20have%20logged%20out%20successfully');
  });
});

// 6. Стартиране на сървъра
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server works on http://localhost:${PORT}`);
});
