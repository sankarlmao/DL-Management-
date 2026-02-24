
# 🎓 DUTY LEAVE MANAGEMENT SYSTEM - COMPLETE SETUP

## ✅ PROJECT COMPLETE & READY TO RUN!

All files have been created and dependencies installed. Here's what you have:

---

## 📦 What's Included

### Backend ✓
- Express.js REST API (Node.js)
- MySQL connection configured
- Student & Staff routes
- Session-based authentication
- All dependencies installed

### Frontend ✓
- Beautiful, responsive UI
- Student dashboard, apply form, application status
- Staff approval dashboards (Advisor, HOD, Host)
- Bootstrap + Custom CSS styling

### Database ✓
- MySQL schema with 3 tables
- Sample data ready to use
- Proper relationships & foreign keys

### Documentation ✓
- Detailed SETUP_GUIDE.md
- Quick-setup utility script
- Code comments throughout

---

## 🚀 5-MINUTE QUICK START

### Step 1: Create Database

Open MySQL and run:

```bash
mysql -u root -p < database/schema.sql
```

Or copy the content from `database/schema.sql` manually.

### Step 2: Start Backend Server

```bash
cd backend
npm start
```

You'll see:
```
╔════════════════════════════════════════════════════════╗
║   DUTY LEAVE MANAGEMENT SYSTEM - Backend Server       ║
║   Server Running on http://localhost:3000           ║
╚════════════════════════════════════════════════════════╝
```

### Step 3: Open Browser

Visit: **`http://localhost:3000`**

### Step 4: Login & Test

#### Student Login:
- Roll Number: `CS2024001`
- Password: `password123`

#### Advisor Login:
- Email: `mohan@staff.com`
- Password: `password123`

#### HOD Login:
- Email: `rajesh@staff.com`
- Password: `password123`

#### Host Login:
- Email: `host@staff.com`
- Password: `password123`

---

## 📁 Complete Project Structure

```
DL-Management-/
├── 📂 backend/
│   ├── config/
│   │   └── database.js              ← MySQL connection
│   ├── routes/
│   │   ├── student.js               ← Student API routes
│   │   └── staff.js                 ← Staff API routes
│   ├── app.js                       ← Express app setup
│   ├── server.js                    ← Start script
│   ├── package.json                 ← Dependencies
│   ├── package-lock.json
│   └── node_modules/                ← ALL dependencies installed ✓
│
├── 📂 frontend/
│   ├── login.html                   ← Main entry page
│   ├── css/
│   │   └── style.css                ← Complete styling
│   ├── js/
│   │   └── script.js                ← All client-side logic
│   ├── 📂 student/
│   │   ├── dashboard.html
│   │   ├── apply.html
│   │   └── view-status.html
│   └── 📂 staff/
│       ├── advisor-dashboard.html
│       ├── hod-dashboard.html
│       └── host-dashboard.html
│
├── 📂 database/
│   └── schema.sql                   ← Complete DB schema + sample data
│
├── SETUP_GUIDE.md                   ← Detailed setup documentation
├── quick-setup.js                   ← Quick setup utility
├── setup.sh                         ← Setup script (bash)
└── README.md                        ← Project overview
```

---

## 🔧 Installed Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| mysql2 | ^3.6.0 | MySQL driver |
| express-session | ^1.17.3 | Session management |
| cors | ^2.8.5 | CORS support |
| body-parser | ^1.20.2 | Request parsing |
| dotenv | ^16.3.1 | Environment variables |
| nodemon | ^3.0.1 | Dev auto-reload |

All installed in: `backend/node_modules/`

---

## 📊 Database Schema

### 3 Tables Created:

#### 1. student
- ID, Name, Roll Number, Semester, Class, Dept, Email, Password

#### 2. staff
- ID, Name, Role (advisor/hod/host), Class, Dept, Email, Password

#### 3. form (Main - Leave Applications)
- ID, Student ID, Reason, Date, Hours
- Advisor/HOD/Host Status & Remarks
- Final Status
- Timestamps

---

## 🔐 Sample Data Ready

**3 Sample Students:**
- Rahul Kumar (CS2024001)
- Priya Singh (CS2024002)
- Amit Sharma (EC2024001)

**3 Sample Staff:**
- Dr. Mohan Kumar (Advisor)
- Prof. Rajesh Singh (HOD)
- Dr. Host Authority (Host)

---

## ⚡ Key Features

✅ Multi-level approval workflow (3 stages)
✅ Session-based authentication
✅ Real-time status updates
✅ Responsive design (mobile + desktop)
✅ Clean, beginner-friendly code
✅ Well-documented
✅ Ready for production in local environment
✅ Easy to modify and extend

---

## 🔄 Complete Workflow Example

### Scenario: Student applies for leave

1. **Student logs in** with roll number CS2024001
2. **Applies for leave** - Date, Hours, Reason
3. **Advisor reviews** - Can approve or reject
   - If rejects → Final Status = REJECTED
4. **HOD reviews** (if advisor approved)
   - If rejects → Final Status = REJECTED
5. **Host reviews** (if both approved)
   - If approves → Final Status = APPROVED ✅
   - If rejects → Final Status = REJECTED ❌

---

## 💡 How to Use Each Page

### Student Pages

**Dashboard** (`/student/dashboard.html`)
- Shows student info
- Quick access to apply & view applications
- Explanation of approval flow

**Apply Leave** (`/student/apply.html`)
- Form to submit leave request
- Fields: Reason, Date, Hours
- Validation included

**My Applications** (`/student/view-status.html`)
- Table of all submitted applications
- Shows status at each level
- Can click to see full details

### Staff Pages

**Advisor Dashboard** (`/staff/advisor-dashboard.html`)
- Shows pending applications
- Approve/Reject buttons
- Can add remarks
- First level of approval

**HOD Dashboard** (`/staff/hod-dashboard.html`)
- Similar to advisor
- Second level of approval
- Can see if advisor already approved

**Host Dashboard** (`/staff/host-dashboard.html`)
- Final level of approval
- Most critical decision
- Can approve or reject for final status

---

## 🎨 Styling & UI

✨ **Bootstrap-inspired design**
✨ Gradient background (purple)
✨ Responsive cards and layouts
✨ Color-coded status badges
✨ Smooth animations
✨ Mobile-friendly navigation
✨ Clean, modern look

---

## 📱 Mobile Responsive

All pages are fully responsive:
- Desktop: Full layout
- Tablet: Adapted layout
- Mobile: Optimized for small screens

---

## 🔒 Security Notes

⚠️ This is a **learning project**. For production:

- [ ] Add password hashing (bcrypt)
- [ ] Use JWT tokens instead of sessions
- [ ] Add input validation
- [ ] Add HTTPS/SSL
- [ ] Add rate limiting
- [ ] Add CSRF protection
- [ ] Use environment variables for secrets
- [ ] Add logging
- [ ] Add error handling

---

## 📚 Files You Should Know

### Most Important:

1. **database/schema.sql** - Database structure
2. **backend/routes/student.js** - Student API logic
3. **backend/routes/staff.js** - Staff API logic
4. **frontend/js/script.js** - Frontend logic
5. **frontend/login.html** - Login page
6. **backend/config/database.js** - Database config

### Configuration:

- **backend/server.js** - Change port here
- **backend/config/database.js** - Change MySQL credentials here
- **frontend/css/style.css** - Change colors/fonts here

---

## 🐛 If Something Goes Wrong

### Error: Cannot find module 'express'
**Fix:** Run `npm install` in the backend folder

### Error: Access denied for MySQL
**Fix:** Update credentials in `backend/config/database.js`

### Error: Unknown database
**Fix:** Import schema.sql into MySQL

### Error: Port already in use
**Fix:** Change port in `backend/server.js` to 4000

### No data in database
**Fix:** Ensure MySQL is running and schema was imported

---

## 📖 Learning Path

**New to programming?** Study in this order:

1. **Database** → Read `database/schema.sql`
2. **Backend Routes** → Read `backend/routes/student.js`
3. **Frontend** → Read `frontend/js/script.js`
4. **HTML** → Read login.html

Each file has comments explaining the code!

---

## 🎓 Perfect For

✅ College projects
✅ Internship interviews
✅ Portfolio showcase
✅ Learning web development
✅ Quick MVP development

---

## 🚀 Next Steps

### Immediate (Start the app):
1. Create database: `mysql -u root -p < database/schema.sql`
2. Start server: `cd backend && npm start`
3. Open: `http://localhost:3000`

### Short term (Understand):
1. Read SETUP_GUIDE.md for detailed info
2. Explore each section of code
3. Test all user flows

### Medium term (Modify):
1. Add more fields to forms
2. Add new student/staff
3. Change colors and styling
4. Modify approval logic

### Long term (Enhance):
1. Add email notifications
2. Add admin panel
3. Add analytics
4. Add file uploads
5. Deploy to cloud

---

## ✅ Verification Checklist

- [x] Backend created (Node.js + Express)
- [x] Frontend created (HTML + CSS + JavaScript)
- [x] Database schema created
- [x] All dependencies installed
- [x] Sample data included
- [x] Routes configured
- [x] Styling complete
- [x] Documentation ready
- [x] Ready to run

---

## 📞 Quick Help

**Port Issue?**
Edit `backend/server.js` line 3

**Database Issue?**
Edit `backend/config/database.js` lines 6-7

**Need Password Hashing?**
Install bcrypt: `npm install bcrypt`

**Want to add JWT?**
Install jwt: `npm install jsonwebtoken`

---

## 🎉 YOU'RE ALL SET!

Everything is ready. Just:

1. Create the database
2. Start the server
3. Open the browser
4. Login and test!

---

**Start the project now:**

```bash
cd backend
npm start
```

Then open: **http://localhost:3000** 🚀

Good luck and happy coding! 😊
