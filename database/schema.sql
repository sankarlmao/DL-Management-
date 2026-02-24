-- Create Database
CREATE DATABASE IF NOT EXISTS duty_leave_db;
USE duty_leave_db;

-- 🟢 1. STUDENT TABLE
CREATE TABLE IF NOT EXISTS student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    semester INT NOT NULL,
    class VARCHAR(20) NOT NULL,
    dept VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🟢 2. STAFF TABLE (Advisor, HOD, Host)
CREATE TABLE IF NOT EXISTS staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL, -- values: 'advisor', 'hod', 'host'
    class VARCHAR(20), -- for advisor (which class they advise)
    dept VARCHAR(50), -- for hod (which dept they head)
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🟢 3. FORM TABLE (MAIN - Leave Applications)
CREATE TABLE IF NOT EXISTS form (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    reason TEXT NOT NULL,
    date DATE NOT NULL,
    hours INT NOT NULL,
    advisor_status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    hod_status VARCHAR(20) DEFAULT 'pending',
    host_status VARCHAR(20) DEFAULT 'pending',
    final_status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    advisor_remarks TEXT,
    hod_remarks TEXT,
    host_remarks TEXT,
    advisor_id INT,
    hod_id INT,
    host_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
    FOREIGN KEY (advisor_id) REFERENCES staff(id) ON DELETE SET NULL,
    FOREIGN KEY (hod_id) REFERENCES staff(id) ON DELETE SET NULL,
    FOREIGN KEY (host_id) REFERENCES staff(id) ON DELETE SET NULL
);

-- Insert Sample Data
-- Sample Students
INSERT INTO student (name, roll_number, semester, class, dept, email, password) VALUES
('Rahul Kumar', 'CS2024001', 6, 'CS-A', 'Computer Science', 'rahul@student.com', 'password123'),
('Priya Singh', 'CS2024002', 6, 'CS-A', 'Computer Science', 'priya@student.com', 'password123'),
('Amit Sharma', 'EC2024001', 4, 'EC-B', 'Electronics', 'amit@student.com', 'password123');

-- Sample Staff
INSERT INTO staff (name, role, class, dept, email, password) VALUES
('Dr. Mohan Kumar', 'advisor', 'CS-A', NULL, 'mohan@staff.com', 'password123'),
('Prof. Rajesh Singh', 'hod', NULL, 'Computer Science', 'rajesh@staff.com', 'password123'),
('Dr. Host Authority', 'host', NULL, NULL, 'host@staff.com', 'password123');

-- Sample Leave Form (For testing)
INSERT INTO form (student_id, reason, date, hours, created_at) VALUES
(1, 'National Symposium Participation', '2026-03-05', 4, NOW());
