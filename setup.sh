#!/bin/bash

# ====================================================================
# DUTY LEAVE MANAGEMENT SYSTEM - QUICK START SCRIPT
# ====================================================================
# Run this script to automatically set up and start the project
# Usage: bash setup.sh
# ====================================================================

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  Duty Leave Management System - Quick Setup Script    ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please download Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm found: $(npm --version)${NC}"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠ MySQL is not installed${NC}"
    echo "Please download MySQL from https://www.mysql.com/downloads/"
    echo "Make sure MySQL server is running before starting the application"
else
    echo -e "${GREEN}✓ MySQL found${NC}"
fi

echo ""
echo "————————————————————————————————————————————————————————"
echo "Installing dependencies..."
echo "————————————————————————————————————————————————————————"

cd backend
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

echo ""
echo "💡 NEXT STEPS:"
echo "————————————————————————————————————————————————————————"
echo ""
echo "1. CREATE DATABASE:"
echo "   mysql -u root -p < database/schema.sql"
echo ""
echo "2. START THE SERVER:"
echo "   cd backend && npm start"
echo ""
echo "3. OPEN BROWSER:"
echo "   http://localhost:3000"
echo ""
echo "4. LOGIN WITH TEST CREDENTIALS:"
echo "   Student Roll: CS2024001 | Password: password123"
echo "   Advisor Email: mohan@staff.com | Password: password123"
echo ""
echo "For more details, see SETUP_GUIDE.md"
echo ""
