const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Middleware to check if staff is logged in
const checkStaffLogin = (req, res, next) => {
  if (!req.session.userId || req.session.userType !== 'staff') {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

// 🔐 STAFF LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const [staffMembers] = await db.query(
      'SELECT id, name, role, email FROM staff WHERE email = ? AND password = ?',
      [email, password]
    );

    if (staffMembers.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const staff = staffMembers[0];
    req.session.userId = staff.id;
    req.session.userName = staff.name;
    req.session.userType = 'staff';
    req.session.staffRole = staff.role;

    // Determine redirect URL based on role
    let redirectUrl = '/staff/advisor-dashboard.html';
    if (staff.role === 'hod') {
      redirectUrl = '/staff/hod-dashboard.html';
    } else if (staff.role === 'host') {
      redirectUrl = '/staff/host-dashboard.html';
    }

    res.json({
      success: true,
      message: 'Login successful',
      staff: staff,
      redirectUrl: redirectUrl
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 📋 GET PENDING FORMS FOR STAFF
router.get('/forms', checkStaffLogin, async (req, res) => {
  try {
    const staffId = req.session.userId;
    const role = req.session.staffRole;

    let query = `
      SELECT 
        f.id,
        f.student_id,
        s.name as student_name,
        s.roll_number,
        s.dept,
        f.reason,
        f.date,
        f.hours,
        f.advisor_status,
        f.hod_status,
        f.host_status,
        f.final_status,
        f.created_at
      FROM form f
      JOIN student s ON f.student_id = s.id
      WHERE f.final_status = 'pending'
    `;

    // Filter based on staff role
    if (role === 'advisor') {
      query += ' AND f.advisor_status = "pending"';
    } else if (role === 'hod') {
      query += ' AND f.hod_status = "pending"';
    } else if (role === 'host') {
      query += ' AND f.host_status = "pending"';
    }

    query += ' ORDER BY f.created_at DESC';

    const [forms] = await db.query(query);

    res.json({
      success: true,
      forms: forms,
      role: role
    });
  } catch (error) {
    console.error('Fetch forms error:', error);
    res.status(500).json({ error: 'Error fetching forms' });
  }
});

// ✅ APPROVE FORM
router.post('/approve/:id', checkStaffLogin, async (req, res) => {
  try {
    const formId = req.params.id;
    const staffId = req.session.userId;
    const role = req.session.staffRole;
    const { remarks } = req.body;

    // Get the form
    const [forms] = await db.query('SELECT * FROM form WHERE id = ?', [formId]);

    if (forms.length === 0) {
      return res.status(404).json({ error: 'Form not found' });
    }

    const form = forms[0];

    // Update based on role
    let updateQuery = 'UPDATE form SET ';
    let params = [];

    if (role === 'advisor') {
      updateQuery += 'advisor_status = ?, advisor_remarks = ?, advisor_id = ? ';
      params = ['approved', remarks || null, staffId];
    } else if (role === 'hod') {
      updateQuery += 'hod_status = ?, hod_remarks = ?, hod_id = ? ';
      params = ['approved', remarks || null, staffId];
    } else if (role === 'host') {
      updateQuery += 'host_status = ?, host_remarks = ?, host_id = ? ';
      params = ['approved', remarks || null, staffId];
    }

    updateQuery += 'WHERE id = ?';
    params.push(formId);

    await db.query(updateQuery, params);

    // Check if all approvals are done
    const [updatedForms] = await db.query('SELECT * FROM form WHERE id = ?', [formId]);
    const updatedForm = updatedForms[0];

    let finalStatus = 'pending';
    if (
      updatedForm.advisor_status === 'approved' &&
      updatedForm.hod_status === 'approved' &&
      updatedForm.host_status === 'approved'
    ) {
      finalStatus = 'approved';
      await db.query('UPDATE form SET final_status = ? WHERE id = ?', [finalStatus, formId]);
    }

    res.json({
      success: true,
      message: `Approved successfully. Final Status: ${finalStatus}`,
      finalStatus: finalStatus
    });
  } catch (error) {
    console.error('Approve error:', error);
    res.status(500).json({ error: 'Error approving form' });
  }
});

// ❌ REJECT FORM
router.post('/reject/:id', checkStaffLogin, async (req, res) => {
  try {
    const formId = req.params.id;
    const staffId = req.session.userId;
    const role = req.session.staffRole;
    const { remarks } = req.body;

    if (!remarks) {
      return res.status(400).json({ error: 'Rejection remarks required' });
    }

    // Update based on role
    let updateQuery = 'UPDATE form SET ';
    let params = [];

    if (role === 'advisor') {
      updateQuery += 'advisor_status = ?, advisor_remarks = ?, advisor_id = ? ';
      params = ['rejected', remarks, staffId];
    } else if (role === 'hod') {
      updateQuery += 'hod_status = ?, hod_remarks = ?, hod_id = ? ';
      params = ['rejected', remarks, staffId];
    } else if (role === 'host') {
      updateQuery += 'host_status = ?, host_remarks = ?, host_id = ? ';
      params = ['rejected', remarks, staffId];
    }

    updateQuery += 'WHERE id = ?';
    params.push(formId);

    await db.query(updateQuery, params);

    // Set final status to rejected
    await db.query('UPDATE form SET final_status = ? WHERE id = ?', ['rejected', formId]);

    res.json({
      success: true,
      message: 'Form rejected successfully',
      finalStatus: 'rejected'
    });
  } catch (error) {
    console.error('Reject error:', error);
    res.status(500).json({ error: 'Error rejecting form' });
  }
});

// 📄 GET SINGLE FORM DETAILS
router.get('/forms/:id', checkStaffLogin, async (req, res) => {
  try {
    const formId = req.params.id;

    const [forms] = await db.query(
      `SELECT 
        f.*,
        s.name as student_name,
        s.roll_number,
        s.dept,
        s.semester
      FROM form f
      JOIN student s ON f.student_id = s.id
      WHERE f.id = ?`,
      [formId]
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
router.get('/me', checkStaffLogin, async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.session.userId,
      name: req.session.userName,
      role: req.session.staffRole,
      userType: req.session.userType
    }
  });
});

module.exports = router;
