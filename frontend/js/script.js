// ==================== UTILITY FUNCTIONS ====================

// Show alert messages
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <strong>${type.toUpperCase()}:</strong> ${message}
    <button style="float: right; background: none; border: none; cursor: pointer; font-size: 20px;" onclick="this.parentElement.style.display='none';">&times;</button>
  `;
  
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  // Auto hide after 5 seconds
  setTimeout(() => {
    alertDiv.style.display = 'none';
  }, 5000);
}

// API Call Helper
async function apiCall(method, endpoint, data = null) {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'API Error');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Check if user is logged in
async function checkAuth() {
  try {
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');

    if (!userType || !userId) {
      window.location.href = '/login.html';
      return false;
    }
    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    window.location.href = '/login.html';
    return false;
  }
}

// Logout function
async function logout() {
  try {
    const userType = localStorage.getItem('userType');
    const endpoint = userType === 'student' ? '/api/student/logout' : '/api/staff/logout';
    
    const result = await apiCall('GET', endpoint);
    
    localStorage.clear();
    window.location.href = result.redirectUrl || '/login.html';
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.clear();
    window.location.href = '/login.html';
  }
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format datetime
function formatDateTime(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Get badge class based on status
function getStatusBadge(status) {
  const statusMap = {
    'pending': 'badge-pending',
    'approved': 'badge-approved',
    'rejected': 'badge-rejected'
  };
  return statusMap[status] || 'badge-pending';
}

// Set navbar user info
async function loadUserInfo() {
  try {
    const userType = localStorage.getItem('userType');
    const endpoint = userType === 'student' ? '/api/student/me' : '/api/staff/me';
    
    const result = await apiCall('GET', endpoint);
    
    if (result.success) {
      const userNameEl = document.getElementById('userName');
      if (userNameEl) {
        userNameEl.textContent = result.user.name;
      }
    }
  } catch (error) {
    console.error('Error loading user info:', error);
  }
}

// ==================== LOGIN PAGE ====================

// Handle login form submission
async function handleLogin(e) {
  e.preventDefault();

  const role = document.querySelector('input[name="role"]:checked');
  
  if (!role) {
    showAlert('Please select a role', 'error');
    return;
  }

  const roleValue = role.value;
  let endpoint = '';
  let loginData = {};

  if (roleValue === 'student') {
    const rollNumber = e.target.querySelector('#rollNumber')?.value;
    const password = e.target.querySelector('input[type="password"]')?.value;

    if (!rollNumber || !password) {
      showAlert('Roll number and password required', 'error');
      return;
    }

    endpoint = '/api/student/login';
    loginData = { rollNumber, password };
  } else {
    const email = e.target.querySelector('#email')?.value;
    const password = e.target.querySelector('input[type="password"]')?.value;

    if (!email || !password) {
      showAlert('Email and password required', 'error');
      return;
    }

    endpoint = '/api/staff/login';
    loginData = { email, password };
  }

  try {
    const loginBtn = e.target.querySelector('button');
    loginBtn.disabled = true;
    loginBtn.innerHTML = '🔄 Logging in...';

    const result = await apiCall('POST', endpoint, loginData);

    if (result.success) {
      localStorage.setItem('userType', roleValue);
      localStorage.setItem('userId', result[roleValue]?.id || result.staff?.id);
      localStorage.setItem('userName', result[roleValue]?.name || result.staff?.name);

      showAlert('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = result.redirectUrl;
      }, 1500);
    }
  } catch (error) {
    showAlert(error.message, 'error');
    const loginBtn = e.target.querySelector('button');
    loginBtn.disabled = false;
    loginBtn.innerHTML = '🔐 Login';
  }
}

// Toggle login form based on selected role
function toggleLoginForm(roleValue) {
  const studentForm = document.getElementById('studentForm');
  const staffForm = document.getElementById('staffForm');

  if (roleValue === 'student') {
    if (studentForm) studentForm.style.display = 'block';
    if (staffForm) staffForm.style.display = 'none';
  } else {
    if (studentForm) studentForm.style.display = 'none';
    if (staffForm) staffForm.style.display = 'block';
  }
}

// Initialize login page
function initLoginPage() {
  const roleRadios = document.querySelectorAll('input[name="role"]');
  roleRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      toggleLoginForm(e.target.value);
    });
  });
}

// ==================== STUDENT PAGES ====================

// Load student dashboard info
async function loadStudentDashboard() {
  if (!await checkAuth()) return;

  try {
    const result = await apiCall('GET', '/api/student/me');
    
    if (result.success) {
      const userEl = document.getElementById('studentName');
      if (userEl) {
        userEl.textContent = result.user.name;
      }

      const infoEl = document.getElementById('studentInfo');
      if (infoEl) {
        infoEl.innerHTML = `
          <strong>Roll Number:</strong> ${result.user.rollNumber}<br>
          <strong>Department:</strong> ${result.user.dept}<br>
          <strong>Semester:</strong> ${result.user.semester}
        `;
      }
    }

    loadUserInfo();
  } catch (error) {
    console.error('Error loading dashboard:', error);
    showAlert('Error loading dashboard', 'error');
  }
}

// Apply for leave
async function handleApplyLeave(e) {
  e.preventDefault();

  const reason = document.getElementById('reason')?.value;
  const date = document.getElementById('date')?.value;
  const hours = document.getElementById('hours')?.value;

  if (!reason || !date || !hours) {
    showAlert('All fields are required', 'error');
    return;
  }

  try {
    const submitBtn = e.target.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Submitting...';

    const result = await apiCall('POST', '/api/student/apply', {
      reason,
      date,
      hours: parseInt(hours)
    });

    if (result.success) {
      showAlert('Leave application submitted successfully!', 'success');
      e.target.reset();
      setTimeout(() => {
        window.location.href = result.redirectUrl;
      }, 1500);
    }
  } catch (error) {
    showAlert(error.message, 'error');
    const submitBtn = e.target.querySelector('button');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '📝 Submit Application';
  }
}

// Load student applications
async function loadStudentApplications() {
  if (!await checkAuth()) return;

  try {
    const result = await apiCall('GET', '/api/student/forms');

    if (result.success && result.forms.length > 0) {
      let tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Reason</th>
              <th>Hours</th>
              <th>Advisor</th>
              <th>HOD</th>
              <th>Host</th>
              <th>Final Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.forms.forEach(form => {
        tableHTML += `
          <tr>
            <td>${formatDate(form.date)}</td>
            <td>${form.reason.substring(0, 30)}...</td>
            <td>${form.hours}</td>
            <td><span class="badge ${getStatusBadge(form.advisor_status)}">${form.advisor_status}</span></td>
            <td><span class="badge ${getStatusBadge(form.hod_status)}">${form.hod_status}</span></td>
            <td><span class="badge ${getStatusBadge(form.host_status)}">${form.host_status}</span></td>
            <td><span class="badge ${getStatusBadge(form.final_status)}">${form.final_status}</span></td>
            <td><button class="btn btn-sm btn-primary" onclick="viewApplicationDetails(${form.id})">View</button></td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      const applicationsEl = document.getElementById('applicationsTable');
      if (applicationsEl) {
        applicationsEl.innerHTML = tableHTML;
      }
    } else {
      const applicationsEl = document.getElementById('applicationsTable');
      if (applicationsEl) {
        applicationsEl.innerHTML = '<p style="padding: 20px; text-align: center; color: #999;">No applications yet. <a href="/student/apply.html">Apply now</a></p>';
      }
    }

    loadUserInfo();
  } catch (error) {
    console.error('Error loading applications:', error);
    showAlert('Error loading applications', 'error');
  }
}

// View application details
async function viewApplicationDetails(formId) {
  try {
    const result = await apiCall('GET', `/api/student/forms/${formId}`);

    if (result.success) {
      const form = result.form;
      alert(`
Leave Application Details:

Reason: ${form.reason}
Date: ${formatDate(form.date)}
Hours: ${form.hours}

Advisor: ${form.advisor_status} ${form.advisor_remarks ? `(${form.advisor_remarks})` : ''}
HOD: ${form.hod_status} ${form.hod_remarks ? `(${form.hod_remarks})` : ''}
Host: ${form.host_status} ${form.host_remarks ? `(${form.host_remarks})` : ''}

Final Status: ${form.final_status}
      `);
    }
  } catch (error) {
    showAlert('Error loading application details', 'error');
  }
}

// ==================== STAFF PAGES ====================

// Load staff dashboard
async function loadStaffDashboard() {
  if (!await checkAuth()) return;

  try {
    const result = await apiCall('GET', '/api/staff/me');
    
    if (result.success) {
      const userEl = document.getElementById('staffName');
      if (userEl) {
        userEl.textContent = result.user.name;
      }

      const roleEl = document.getElementById('staffRole');
      if (roleEl) {
        roleEl.textContent = result.user.role.toUpperCase();
      }
    }

    loadPendingForms();
    loadUserInfo();
  } catch (error) {
    console.error('Error loading dashboard:', error);
    showAlert('Error loading dashboard', 'error');
  }
}

// Load pending forms for staff
async function loadPendingForms() {
  try {
    const result = await apiCall('GET', '/api/staff/forms');

    if (result.success && result.forms.length > 0) {
      let tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll Number</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Hours</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
      `;

      result.forms.forEach(form => {
        tableHTML += `
          <tr>
            <td>${form.student_name}</td>
            <td>${form.roll_number}</td>
            <td>${formatDate(form.date)}</td>
            <td>${form.reason.substring(0, 25)}...</td>
            <td>${form.hours}</td>
            <td><span class="badge badge-pending">Pending Your Approval</span></td>
            <td>
              <button class="btn btn-sm btn-success" onclick="approveForm(${form.id})">✓ Approve</button>
              <button class="btn btn-sm btn-danger" onclick="rejectForm(${form.id})">✗ Reject</button>
            </td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      const formsEl = document.getElementById('pendingForms');
      if (formsEl) {
        formsEl.innerHTML = tableHTML;
      }
    } else {
      const formsEl = document.getElementById('pendingForms');
      if (formsEl) {
        formsEl.innerHTML = '<p style="padding: 20px; text-align: center; color: #999;">No pending forms for approval</p>';
      }
    }
  } catch (error) {
    console.error('Error loading forms:', error);
    showAlert('Error loading forms', 'error');
  }
}

// Approve form
async function approveForm(formId) {
  const remarks = prompt('Enter approval remarks (optional):');

  try {
    const result = await apiCall('POST', `/api/staff/approve/${formId}`, { remarks });

    if (result.success) {
      showAlert(`Form approved! Final Status: ${result.finalStatus}`, 'success');
      loadPendingForms();
    }
  } catch (error) {
    showAlert(error.message, 'error');
  }
}

// Reject form
async function rejectForm(formId) {
  const remarks = prompt('Enter rejection remarks (required):');

  if (!remarks) {
    showAlert('Remarks are required for rejection', 'error');
    return;
  }

  try {
    const result = await apiCall('POST', `/api/staff/reject/${formId}`, { remarks });

    if (result.success) {
      showAlert('Form rejected', 'error');
      loadPendingForms();
    }
  } catch (error) {
    showAlert(error.message, 'error');
  }
}

// Set min date for date input (today)
function setMinDate() {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}
