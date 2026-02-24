# 🎓 Duty Leave Management System - Quick Run Guide

## ⚡ How to Run This Project

### Step 1: Create the Database
Open your MySQL terminal and run:
```bash
mysql -u root -p < database/schema.sql
```
**What it does:** Creates the `duty_leave_db` database with 3 tables and sample data.

---

### Step 2: Start the Backend Server
Run these commands:
```bash
cd backend
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════╗
║   DUTY LEAVE MANAGEMENT SYSTEM - Backend Server       ║
║   Server Running on http://localhost:3000           ║
╚════════════════════════════════════════════════════════╝
```

---

### Step 3: Open Browser
Go to: **http://localhost:3000**

Done! ✅

---

## 🔑 Test Credentials to Login

### Student Account:
- **Roll Number:** `CS2024001`
- **Password:** `password123`

### Advisor Account:
- **Email:** `mohan@staff.com`
- **Password:** `password123`

### HOD Account:
- **Email:** `rajesh@staff.com`
- **Password:** `password123`

### Host Account:
- **Email:** `host@staff.com`
- **Password:** `password123`

---

## 🎯 What This System Does

### For Students:
1. **Login** with roll number
2. **Apply for Duty Leave** - Fill reason, date, hours
3. **View Status** - Track approval progress

### For Staff (3 Levels):
1. **Advisor** - First approval level
2. **HOD** - Second approval level
3. **Host** - Final approval level

### Approval Logic:
```
If ALL 3 approve → Leave is APPROVED ✅
If ANY 1 rejects → Leave is REJECTED ❌
```

---

## 📂 Important Project Structure

```
DL-Management-/
├── backend/                    [Node.js API Server]
│   ├── server.js              ← Start the server HERE
│   ├── config/database.js     ← MySQL connection settings
│   ├── routes/student.js      ← Student API logic
│   ├── routes/staff.js        ← Staff API logic
│   └── package.json           ← All dependencies listed
│
├── frontend/                   [Web Pages]
│   ├── login.html             ← Entry point (http://localhost:3000)
│   ├── js/script.js           ← All JavaScript logic
│   ├── css/style.css          ← Styling
│   ├── student/               ← Student pages
│   └── staff/                 ← Staff dashboards
│
├── database/
│   └── schema.sql             ← Database structure & sample data
│
└── [Guides & Utils]
    ├── START_HERE.txt         ← Quick reference
    ├── SETUP_GUIDE.md         ← Detailed setup
    ├── INSTALL_COMPLETE.md    ← Installation info
    └── verify.js              ← Check if everything is ready
```

---

## 🔧 Important Configuration Files

### 1. Database Connection
**File:** `backend/config/database.js`

If you have a MySQL password, change:
```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',        ← Put your MySQL password here
  database: 'duty_leave_db',
  ...
});
```

### 2. Backend Port
**File:** `backend/server.js`

To use a different port (e.g., 4000 instead of 3000):
```javascript
const PORT = process.env.PORT || 4000;  ← Change 3000 to 4000
```

---

## 📊 Database Tables Explained

### Table 1: `student`
Stores student information
- Roll number, name, semester, department, password

### Table 2: `staff`
Stores staff/advisor/HOD/host information
- Name, role (advisor/hod/host), email, password

### Table 3: `form`
Main table - stores leave applications
- Student's request details
- Status of each approval level (advisor, hod, host)
- Final status (approved/rejected)
- Remarks from each authority

---

## 🔄 How the Approval Workflow Works

### Step 1: Student Applies
- Student fills: Reason, Date, Hours
- All statuses start as **pending**

### Step 2: Advisor Reviews
- **Approves** → `advisor_status = approved`
- **Rejects** → `final_status = rejected` ❌ (DONE)

### Step 3: HOD Reviews (if advisor approved)
- **Approves** → `hod_status = approved`
- **Rejects** → `final_status = rejected` ❌ (DONE)

### Step 4: Host Reviews (if both approved)
- **Approves** → `final_status = approved` ✅ 
- **Rejects** → `final_status = rejected` ❌

---

## ✨ Page Overview

### Student Pages:

**Dashboard** (`/student/dashboard.html`)
- Shows student info
- Quick links to apply & view status
- Explains the workflow

**Apply Leave** (`/student/apply.html`)
- Form to submit new leave request
- Validates date, hours, reason

**My Applications** (`/student/view-status.html`)
- Table showing all submitted applications
- Shows status at each level (advisor, HOD, host, final)

### Staff Pages:

**Advisor Dashboard** (`/staff/advisor-dashboard.html`)
- Shows pending applications waiting for advisor approval
- Can approve or reject with remarks

**HOD Dashboard** (`/staff/hod-dashboard.html`)
- Shows pending applications (only if advisor already approved)
- Can approve or reject

**Host Dashboard** (`/staff/host-dashboard.html`)
- Shows pending applications (only if advisor + HOD approved)
- Final decision authority
- Can approve or reject

---

## 🚀 Example Workflow (Complete Test)

1. **Login as Student** (CR2024001 / password123)
   - Go to "Apply Leave"
   - Fill: Reason = "Symposium", Date = any future date, Hours = 4
   - Click Submit

2. **Login as Advisor** (mohan@staff.com / password123)
   - See the student's request
   - Click "Approve" (or "Reject" to test rejection)
   - Note: Now HOD can act

3. **Login as HOD** (rajesh@staff.com / password123)
   - See the student's request
   - Click "Approve" (or reject)
   - Note: Now Host can act

4. **Login as Host** (host@staff.com / password123)
   - See the student's request
   - Click "Approve"
   - Result: Final Status = APPROVED ✅

5. **Login back as Student**
   - Go to "My Applications"
   - See the final status = APPROVED ✅

---

## 🛠️ Dependencies Used

```
express@4.22.1           - Web framework for creating API
mysql2@3.18.0            - Connect to MySQL database
express-session@1.19.0   - Store login sessions
cors@2.8.6               - Allow cross-origin requests
body-parser@1.20.4       - Parse incoming JSON data
dotenv@16.6.1            - Load environment variables
nodemon@3.1.14           - Auto-reload during development (dev only)
```

All are **already installed** in `backend/node_modules/` ✓

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot find module 'express'"
**Fix:**
```bash
cd backend
npm install
```

### Issue 2: "Access denied for user 'root'@'localhost'"
**Fix:** Update password in `backend/config/database.js` (line 6)

### Issue 3: "Unknown database 'duty_leave_db'"
**Fix:** Run the schema file:
```bash
mysql -u root -p < database/schema.sql
```

### Issue 4: "Port 3000 already in use"
**Fix:** Change port in `backend/server.js` (line 3)

### Issue 5: No data showing in database
**Fix:** 
1. Make sure MySQL is running
2. Make sure schema.sql was imported
3. Check database credentials in `backend/config/database.js`

---

## 📝 Code Structure Overview

### Backend API Routes:

**Student Routes:**
- `POST /api/student/login` - Student login
- `POST /api/student/apply` - Submit leave application
- `GET /api/student/forms` - Get all student's applications
- `GET /api/student/me` - Get current user info

**Staff Routes:**
- `POST /api/staff/login` - Staff login
- `GET /api/staff/forms` - Get pending applications
- `POST /api/staff/approve/:id` - Approve application
- `POST /api/staff/reject/:id` - Reject application

### Frontend Logic:
- `js/script.js` contains ALL JavaScript functions
- `css/style.css` contains ALL styling
- HTML files are simple - no JavaScript in them

---

## ✅ Verification Checklist Before Running

- [ ] MySQL is installed and running
- [ ] Database schema is imported (`database/schema.sql`)
- [ ] Node.js is installed (`node --version`)
- [ ] Dependencies are installed (check `backend/node_modules/`)
- [ ] Run `node verify.js` to check all components

Run this to verify:
```bash
cd /home/sankar/github/DL-Management-
node verify.js
```

Should show: **✅ ALL CHECKS PASSED - PROJECT IS READY!**

---

## 📚 Key Files to Understand

1. **database/schema.sql** - Understand the table structure
2. **backend/routes/student.js** - How student API works
3. **backend/routes/staff.js** - How staff API works
4. **frontend/js/script.js** - How frontend logic works
5. **frontend/login.html** - How login page works

---

## 🎯 Important Things to Remember

1. **All 3 must approve** - For the leave to be approved, advisor AND hod AND host must all approve
2. **Any rejection** - If even one person rejects, the whole application is rejected
3. **Remarks are optional** - Staff can add comments when approving, but must add remarks when rejecting
4. **Session-based** - Users stay logged in using sessions (not JWT)
5. **Beginner-friendly** - Code has lots of comments, easy to modify

---

## 🚀 To Start Development

1. Backend changes? Edit files in `backend/routes/`
2. Frontend changes? Edit files in `frontend/`
3. Styling changes? Edit `frontend/css/style.css`
4. Want to add fields? Edit `database/schema.sql` and the routes

Changes to `js` and `css` files take effect immediately.
Changes to `backend` files need server restart (or just save if using nodemon).

---

## 📞 Need Help?

1. Check **SETUP_GUIDE.md** for detailed setup
2. Check **START_HERE.txt** for quick reference
3. Check code comments - everything is explained
4. Run **verify.js** to check project status

---

**That's it! You have a complete, working Duty Leave Management System.** 🎉

Just run the 3 steps above and you're good to go!
