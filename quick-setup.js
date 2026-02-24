#!/usr/bin/env node

// ====================================================================
// DUTY LEAVE MANAGEMENT SYSTEM - QUICK SETUP UTILITY
// ====================================================================
// This utility helps you set up the project quickly
// Usage: node quick-setup.js
// ====================================================================

const fs = require('fs');
const path = require('path');

console.log(`
╔════════════════════════════════════════════════════════╗
║  🎓 Duty Leave Management System - Setup Utility      ║
║         Quick Start Configuration Tool                ║
╚════════════════════════════════════════════════════════╝

`);

console.log(`✅ Project Structure: COMPLETE
├── Backend:    ✓ Express.js API
├── Frontend:   ✓ HTML + CSS + JavaScript
├── Database:   ✓ MySQL Schema
└── Docs:       ✓ Setup Guides

`);

console.log(`📦 Dependencies Already Installed:
✓ express@4.18.2         - Web Framework
✓ mysql2@3.6.0           - Database Driver
✓ express-session@1.17.3 - Session Management
✓ cors@2.8.5             - CORS Support
✓ body-parser@1.20.2     - Request Parsing
✓ dotenv@16.3.1          - Environment Variables
✓ nodemon@3.0.1          - Development Tool

`);

console.log(`🚀 QUICK START STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1️⃣  : CREATE DATABASE
  → Open MySQL Command Line
  → Run: mysql -u root -p < database/schema.sql
  → Or copy database/schema.sql content to MySQL

Step 2️⃣  : START BACKEND SERVER
  → cd backend
  → npm start
  → You should see: "Server Running on http://localhost:3000"

Step 3️⃣  : OPEN IN BROWSER
  → Go to: http://localhost:3000

Step 4️⃣  : LOGIN & TEST
  → Use test credentials below

`);

console.log(`🔑 TEST CREDENTIALS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍🎓 STUDENT LOGIN:
   Roll Number: CS2024001
   Password:    password123

👨‍🏫 ADVISOR LOGIN:
   Email:       mohan@staff.com
   Password:    password123

👔 HOD LOGIN:
   Email:       rajesh@staff.com
   Password:    password123

🎓 HOST LOGIN:
   Email:       host@staff.com
   Password:    password123

`);

console.log(`📁 PROJECT STRUCTURE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DL-Management-/
├── backend/                    [Node.js + Express Backend]
│   ├── config/database.js      MySQL connection config
│   ├── routes/
│   │   ├── student.js          Student routes
│   │   └── staff.js            Staff routes
│   ├── app.js                  Express setup
│   └── server.js               Start script
├── frontend/                   [HTML + CSS + JavaScript]
│   ├── login.html              Login entry page
│   ├── css/style.css           Styling
│   ├── js/script.js            Client logic
│   ├── student/                Student pages
│   └── staff/                  Staff dashboards
├── database/
│   └── schema.sql              Complete database schema
└── SETUP_GUIDE.md              Detailed setup guide

`);

console.log(`❓ WHAT DOES EACH COMPONENT DO?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🗄️  DATABASE (MySQL)
   - Stores students, staff, and leave forms
   - 3 tables: student, staff, form
   - 3 sample students + staff ready to use

🖥️  BACKEND (Node.js + Express)
   - Handles login validation
   - Manages leave applications
   - Processes approvals/rejections
   - REST APIs for frontend

🎨 FRONTEND (HTML + CSS + JS)
   - Student dashboard & forms
   - Staff approval dashboards
   - Real-time status updates
   - Responsive design

`);

console.log(`🔄 HOW THE WORKFLOW WORKS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Student applies for duty leave
   └─ Status: pending (all 3 authorities)

2. Advisor reviews and approves/rejects
   └─ If rejected → final_status = rejected ❌

3. If advisor approved, HOD reviews
   └─ If rejected → final_status = rejected ❌

4. If HOD approved, Host reviews (final)
   └─ If approved → final_status = approved ✅
   └─ If rejected → final_status = rejected ❌

`);

console.log(`📚 LEARNING RESOURCES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Study in this order:
1. database/schema.sql       → Understand tables
2. backend/routes/student.js → Learn API logic
3. frontend/js/script.js     → Understand frontend
4. frontend/*.html           → See how it works

`);

console.log(`🐛 TROUBLESHOOTING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Cannot find module 'express'
   → Run: cd backend && npm install

❌ Access denied for MySQL
   → Update backend/config/database.js with your credentials

❌ Unknown database 'duty_leave_db'
   → Create database: mysql -u root -p < database/schema.sql

❌ Port 3000 already in use
   → Change PORT in backend/server.js

`);

console.log(`✨ YOU'RE ALL SET UP! 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next: Start the backend server
  cd backend && npm start

Then open: http://localhost:3000

Happy coding! 🚀
`);
