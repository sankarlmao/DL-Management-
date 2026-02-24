#!/usr/bin/env node

/**
 * ====================================================================
 * DUTY LEAVE MANAGEMENT SYSTEM - VERIFICATION & TEST UTILITY
 * ====================================================================
 * This script verifies all project components are properly installed
 * and ready to run.
 * 
 * Usage: node verify.js
 * ====================================================================
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔════════════════════════════════════════════════════════╗
║  🎓 Duty Leave Management System                       ║
║         Project Verification & Status Report          ║
╚════════════════════════════════════════════════════════╝

`);

let allGood = true;
const checks = [];

// Color codes
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function checkFile(filePath, name) {
  const exists = fs.existsSync(filePath);
  checks.push({
    name: name,
    status: exists ? 'OK' : 'MISSING'
  });
  if (!exists) allGood = false;
  return exists;
}

function checkDir(dirPath, name) {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  checks.push({
    name: name,
    status: exists ? 'OK' : 'MISSING'
  });
  if (!exists) allGood = false;
  return exists;
}

// Check project root directory
console.log(`📁 Checking Project Structure...`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

// Backend files
console.log(`🔧 Backend Files:`);
checkDir('./backend', '  backend/');
checkFile('./backend/app.js', '  backend/app.js');
checkFile('./backend/server.js', '  backend/server.js');
checkFile('./backend/package.json', '  backend/package.json');
checkDir('./backend/config', '  backend/config/');
checkFile('./backend/config/database.js', '  backend/config/database.js');
checkDir('./backend/routes', '  backend/routes/');
checkFile('./backend/routes/student.js', '  backend/routes/student.js');
checkFile('./backend/routes/staff.js', '  backend/routes/staff.js');

console.log(`\n🎨 Frontend Files:`);
checkDir('./frontend', '  frontend/');
checkFile('./frontend/login.html', '  frontend/login.html');
checkDir('./frontend/css', '  frontend/css/');
checkFile('./frontend/css/style.css', '  frontend/css/style.css');
checkDir('./frontend/js', '  frontend/js/');
checkFile('./frontend/js/script.js', '  frontend/js/script.js');
checkDir('./frontend/student', '  frontend/student/');
checkFile('./frontend/student/dashboard.html', '  frontend/student/dashboard.html');
checkFile('./frontend/student/apply.html', '  frontend/student/apply.html');
checkFile('./frontend/student/view-status.html', '  frontend/student/view-status.html');
checkDir('./frontend/staff', '  frontend/staff/');
checkFile('./frontend/staff/advisor-dashboard.html', '  frontend/staff/advisor-dashboard.html');
checkFile('./frontend/staff/hod-dashboard.html', '  frontend/staff/hod-dashboard.html');
checkFile('./frontend/staff/host-dashboard.html', '  frontend/staff/host-dashboard.html');

console.log(`\n🗄️  Database Files:`);
checkDir('./database', '  database/');
checkFile('./database/schema.sql', '  database/schema.sql');

console.log(`\n📚 Documentation:`);
checkFile('./SETUP_GUIDE.md', '  SETUP_GUIDE.md');
checkFile('./INSTALL_COMPLETE.md', '  INSTALL_COMPLETE.md');
checkFile('./README.md', '  README.md');

console.log(`\n🔨 Dependencies:`);
const nodeModulesPath = './backend/node_modules';
if (fs.existsSync(nodeModulesPath)) {
  console.log(`  ✓ node_modules/ (dependencies installed)`);
  checks.push({ name: '  node_modules/', status: 'OK' });
  
  // Check specific packages
  const packages = ['express', 'mysql2', 'express-session', 'cors', 'body-parser', 'dotenv', 'nodemon'];
  packages.forEach(pkg => {
    const exists = fs.existsSync(path.join(nodeModulesPath, pkg));
    if (exists) {
      console.log(`    ✓ ${pkg}`);
    } else {
      console.log(`    ✗ ${pkg} (missing)`);
      allGood = false;
    }
  });
} else {
  console.log(`  ✗ node_modules/ (run: npm install in backend/)`);
  allGood = false;
  checks.push({ name: '  node_modules/', status: 'MISSING' });
}

// Summary
console.log(`\n\n╔════════════════════════════════════════════════════════╗`);
console.log(`║ VERIFICATION SUMMARY                                   ║`);
console.log(`╠════════════════════════════════════════════════════════╣`);

let okCount = 0;
let errorCount = 0;

checks.forEach(check => {
  if (check.status === 'OK') {
    console.log(`║ ${GREEN}✓${RESET} ${check.name.padEnd(48)} ${check.status}`);
    okCount++;
  } else {
    console.log(`║ ${RED}✗${RESET} ${check.name.padEnd(48)} ${check.status}`);
    errorCount++;
  }
});

console.log(`╠════════════════════════════════════════════════════════╣`);
console.log(`║ Total: ${okCount} OK, ${errorCount} ISSUES${' '.repeat(37)} ║`);
console.log(`╚════════════════════════════════════════════════════════╝\n`);

// Status
if (allGood) {
  console.log(`${GREEN}✅ ALL CHECKS PASSED - PROJECT IS READY!${RESET}\n`);
  
  console.log(`🚀 NEXT STEPS:`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`1️⃣  Create database:`);
  console.log(`   mysql -u root -p < database/schema.sql\n`);
  
  console.log(`2️⃣  Start the server:`);
  console.log(`   cd backend && npm start\n`);
  
  console.log(`3️⃣  Open browser:`);
  console.log(`   http://localhost:3000\n`);
  
  console.log(`4️⃣  Login with:`);
  console.log(`   Student: CS2024001 / password123`);
  console.log(`   Advisor: mohan@staff.com / password123\n`);
  
  console.log(`📖 For detailed instructions:`);
  console.log(`   Read INSTALL_COMPLETE.md or SETUP_GUIDE.md\n`);
  
} else {
  console.log(`${RED}⚠️  ISSUES FOUND - PLEASE FIX ABOVE ERRORS${RESET}\n`);
  
  console.log(`Common fixes:\n`);
  console.log(`1. Missing dependencies?`);
  console.log(`   → cd backend && npm install\n`);
  
  console.log(`2. Missing files?`);
  console.log(`   → Check if all files were created properly\n`);
  
  console.log(`3. Still having issues?`);
  console.log(`   → Read SETUP_GUIDE.md\n`);
}

console.log(`════════════════════════════════════════════════════════\n`);
