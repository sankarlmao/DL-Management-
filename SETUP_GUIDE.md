# 🎓 Duty Leave Management System (DLMS)

A simple, beginner-friendly web application for managing duty leave approvals with multi-level workflow (Advisor → HOD → Host).

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [Test Credentials](#test-credentials)
- [How It Works](#how-it-works)
- [API Routes](#api-routes)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

✅ **Two User Roles:**
- Student: Apply for duty leave
- Staff: Advisor, HOD, Host (Approve/Reject)

✅ **Multi-Level Approval Workflow:**
- Student applies → Advisor approves → HOD approves → Host approves → Final Status

✅ **Simple & Beginner-Friendly:**
- No complex architecture
- Easy to understand and modify
- Session-based authentication (no JWT)

✅ **Responsive Design:**
- Works on mobile and desktop
- Bootstrap-based styling

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js + Express.js |
| **Database** | MySQL 5.7+ |
| **Frontend** | HTML5 + CSS3 + JavaScript (Vanilla) |
| **Session** | Express Session |
| **Styling** | Bootstrap + Custom CSS |

---

## 📁 Project Structure

```
DL-Management-/
├── backend/
│   ├── config/
│   │   └── database.js          # MySQL connection config
│   ├── routes/
│   │   ├── student.js           # Student routes
│   │   └── staff.js             # Staff routes (all roles)
│   ├── app.js                   # Express app setup
│   ├── server.js                # Server entry point
│   └── package.json             # Node.js dependencies
│
├── frontend/
│   ├── login.html               # Login page
│   ├── css/
│   │   └── style.css            # Main stylesheet
│   ├── js/
│   │   └── script.js            # Client-side logic
│   ├── student/
│   │   ├── dashboard.html       # Student dashboard
│   │   ├── apply.html           # Apply for leave
│   │   └── view-status.html     # View applications
│   └── staff/
│       ├── advisor-dashboard.html
│       ├── hod-dashboard.html
│       └── host-dashboard.html
│
├── database/
│   └── schema.sql               # Database schema + sample data
│
└── README.md                     # This file
```

---

## 📥 Installation

### Prerequisites

Make sure you have installed:
- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **MySQL Server** (v5.7+) - [Download](https://www.mysql.com/downloads/)

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web framework
- `mysql2` - MySQL driver
- `express-session` - Session management
- `cors` - Cross-origin support
- `body-parser` - Request parsing
- `dotenv` - Environment variables
- `nodemon` - Auto-reload (dev only)

### Step 3: Verify Installation

```bash
npm list
```

---

## 🗄️ Database Setup

### Step 1: Open MySQL Command Line

```bash
mysql -u root -p
```

Enter your MySQL root password (leave blank if you don't have one).

### Step 2: Create Database and Tables

Copy all content from `database/schema.sql` and paste it in MySQL:

```sql
-- Create Database
CREATE DATABASE IF NOT EXISTS duty_leave_db;
USE duty_leave_db;

-- Copy the entire schema.sql content here
```

Or use this shortcut:

```bash
mysql -u root -p < database/schema.sql
```

### Step 3: Verify Tables

```bash
mysql -u root -p
USE duty_leave_db;
SHOW TABLES;
```

You should see:
- `student`
- `staff`
- `form`

---

## ▶️ Running the Project

### Step 1: Start the Backend Server

```bash
cd backend
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════╗
║   DUTY LEAVE MANAGEMENT SYSTEM - Backend Server       ║
║   Server Running on http://localhost:3000           ║
║   Open: http://localhost:3000                        ║
╚════════════════════════════════════════════════════════╝
```

### Step 2: Open in Browser

Visit: **http://localhost:3000**

---

## 👤 Test Credentials

### Student Login

| Field | Value |
|-------|-------|
| Roll Number | `CS2024001` |
| Password | `password123` |

### Advisor Login

| Field | Value |
|-------|-------|
| Email | `mohan@staff.com` |
| Password | `password123` |

### HOD Login

| Field | Value |
|-------|-------|
| Email | `rajesh@staff.com` |
| Password | `password123` |

### Host Login

| Field | Value |
|-------|-------|
| Email | `host@staff.com` |
| Password | `password123` |

---

## 🔄 How It Works

### 1. **Student Apply for Leave**

- Student logs in with roll number
- Fills reason, date, and hours
- Submits application
- Status = **PENDING** (all three)

### 2. **Advisor Reviews**

- Advisor logs in
- Sees pending applications
- Clicks "Approve" or "Reject"
- Advisor status changes

### 3. **HOD Reviews**

- HOD logs in
- Sees pending applications (if advisor approved)
- Clicks "Approve" or "Reject"
- HOD status changes

### 4. **Host Reviews (Final)**

- Host logs in
- Sees pending applications (if advisor + HOD approved)
- Clicks "Approve" or "Reject"
- **FINAL STATUS** is set!

### 5. **Final Status Logic**

```
IF (advisor = approved) AND (hod = approved) AND (host = approved)
  THEN final_status = APPROVED ✅
ELSE
  THEN final_status = REJECTED ❌
```

---

## 📡 API Routes

### Student Routes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/student/login` | Student login |
| POST | `/api/student/apply` | Submit leave application |
| GET | `/api/student/forms` | Get all applications |
| GET | `/api/student/forms/:id` | Get single application |
| GET | `/api/student/me` | Get current user info |
| GET | `/api/student/logout` | Logout |

### Staff Routes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/staff/login` | Staff login |
| GET | `/api/staff/forms` | Get pending forms |
| GET | `/api/staff/forms/:id` | Get form details |
| POST | `/api/staff/approve/:id` | Approve leave form |
| POST | `/api/staff/reject/:id` | Reject leave form |
| GET | `/api/staff/me` | Get current user info |
| GET | `/api/staff/logout` | Logout |

---

## 🗄️ Database Schema

### Student Table
```sql
CREATE TABLE student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    roll_number VARCHAR(20) UNIQUE,
    semester INT,
    class VARCHAR(20),
    dept VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);
```

### Staff Table
```sql
CREATE TABLE staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    role VARCHAR(20), -- 'advisor', 'hod', 'host'
    class VARCHAR(20),
    dept VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);
```

### Form Table
```sql
CREATE TABLE form (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    reason TEXT,
    date DATE,
    hours INT,
    advisor_status VARCHAR(20) DEFAULT 'pending',
    hod_status VARCHAR(20) DEFAULT 'pending',
    host_status VARCHAR(20) DEFAULT 'pending',
    final_status VARCHAR(20) DEFAULT 'pending',
    advisor_remarks TEXT,
    hod_remarks TEXT,
    host_remarks TEXT,
    advisor_id INT,
    hod_id INT,
    host_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student(id)
);
```

---

## ❓ Frequently Asked Questions

### Q: How do I add more students?

**A:** Insert into the `student` table:

```sql
INSERT INTO student (name, roll_number, semester, class, dept, email, password)
VALUES ('New Student', 'CS2024003', 6, 'CS-A', 'Computer Science', 'new@student.com', 'password123');
```

### Q: How do I add more staff?

**A:** Insert into the `staff` table:

```sql
INSERT INTO staff (name, role, class, dept, email, password)
VALUES ('Dr. New HOD', 'hod', NULL, 'Computer Science', 'hotd@staff.com', 'password123');
```

### Q: Can I change the database name?

**A:** Yes! Edit `backend/config/database.js` and update the `database` field.

### Q: Is this secure for production?

**A:** No, this is for learning. For production:
- Use password hashing (bcrypt)
- Implement JWT tokens
- Add HTTPS
- Add input validation
- Add rate limiting

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'express'"

**Solution:** Run `npm install` in the `backend/` directory.

### Error: "Access denied for user 'root'@'localhost'"

**Solution:** Update MySQL credentials in `backend/config/database.js`

### Error: "Unknown database 'duty_leave_db'"

**Solution:** Run the SQL schema file to create the database:
```bash
mysql -u root -p < database/schema.sql
```

### Port 3000 already in use

**Solution:** Change the port in `backend/server.js`:
```javascript
const PORT = process.env.PORT || 4000; // Use 4000 instead
```

### Data not showing in database

**Solution:** 
1. Check MySQL is running
2. Verify database credentials in `backend/config/database.js`
3. Ensure schema.sql was executed

---

## 📚 Additional Resources

- **Node.js Docs:** https://nodejs.org/docs/
- **Express.js:** https://expressjs.com/
- **MySQL:** https://dev.mysql.com/doc/
- **JavaScript:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/

---

## 📝 License

This project is open-source and available for educational purposes.

---

## 💡 Next Steps to Enhance

1. Add password hashing (bcrypt)
2. Add email notifications
3. Add analytics/reports
4. Add more fields to form
5. Add file uploads (documents)
6. Deploy to production (Heroku, AWS, etc.)

---

**Happy Coding! 🚀**
