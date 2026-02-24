const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session Configuration
app.use(session({
  secret: 'your_secret_key_change_this',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const studentRoutes = require('./routes/student');
const staffRoutes = require('./routes/staff');

app.use('/api/student', studentRoutes);
app.use('/api/staff', staffRoutes);

// Root route - serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Server error', message: err.message });
});

module.exports = app;
