const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Middleware to check if student is logged in
const checkStudentLogin = (req, res, next) => {
  if (!req.session.userId || req.session.userType !== 'student') {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

// 🔐 STUDENT LOGIN
router.post('/login', async (req, res) => {
  try {
    const { rollNumber, password } = req.body;

    if (!rollNumber || !password) {
      return res.status(400).json({ error: 'Roll number and password required' });
    }

    const [students] = await db.query(
      'SELECT id, name, roll_number, dept, semester FROM student WHERE roll_number = ? AND password = ?',
      [rollNumber, password]
    );

    if (students.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const student = students[0];
    req.session.userId = student.id;
    req.session.userName = student.name;
    req.session.userType = 'student';
    req.session.rollNumber = student.roll_number;
    req.session.dept = student.dept;

    res.json({
      success: true,
      message: 'Login successful',
      student: student,
      redirectUrl: '/student/dashboard.html'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 📝 STUDENT APPLY FOR LEAVE
router.post('/apply', checkStudentLogin, async (req, res) => {
  try {
    const { reason, date, hours } = req.body;
    const studentId = req.session.userId;

    if (!reason || !date || !hours) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Validate hours
    if (hours <= 0 || hours > 24) {
      return res.status(400).json({ error: 'Hours must be between 1 and 24' });
    }

    // Validate date (should be today or future)
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ error: 'Cannot apply for past dates' });
    }

    const [result] = await db.query(
      'INSERT INTO form (student_id, reason, date, hours) VALUES (?, ?, ?, ?)',
      [studentId, reason, date, hours]
    );

    res.json({
      success: true,
      message: 'Leave application submitted successfully',
      formId: result.insertId,
      redirectUrl: '/student/view-status.html'
    });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ error: 'Error submitting application' });
  }
});

// 📋 GET STUDENT'S ALL FORMS
router.get('/forms', checkStudentLogin, async (req, res) => {
  try {
    const studentId = req.session.userId;

    const [forms] = await db.query(
      `SELECT 
        f.id,
        f.reason,
        f.date,
        f.hours,
        f.advisor_status,
        f.hod_status,
        f.host_status,
        f.final_status,
        f.created_at,
        f.advisor_remarks,
        f.hod_remarks,
        f.host_remarks
      FROM form f
      WHERE f.student_id = ?
      ORDER BY f.created_at DESC`,
      [studentId]
    );

    res.json({
      success: true,
      forms: forms
    });
  } catch (error) {
    console.error('Fetch forms error:', error);
    res.status(500).json({ error: 'Error fetching forms' });
  }
});

// 📄 GET SINGLE FORM DETAILS
router.get('/forms/:id', checkStudentLogin, async (req, res) => {
  try {
    const formId = req.params.id;
    const studentId = req.session.userId;

    const [forms] = await db.query(
      'SELECT * FROM form WHERE id = ? AND student_id = ?',
      [formId, studentId]
    );

    if (forms.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    res.json({
      success: true,
      form: forms[0]
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching form details' });
  }
});

// 🚪 LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({
      success: true,
      message: 'Logged out successfully',
      redirectUrl: '/login.html'
    });
  });
});

// 👤 GET CURRENT USER INFO
router.get('/me', checkStudentLogin, async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.session.userId,
      name: req.session.userName,
      rollNumber: req.session.rollNumber,
      dept: req.session.dept,
      userType: req.session.userType
    }
  });
});

module.exports = router;
