-- Create employees table
-- db.query(`
--   CREATE TABLE IF NOT EXISTS employees (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL
--   )
-- `, (err) => {
--   if (err) {
--     console.error('Error creating employees table: ' + err.stack);
--     return;
--   }
--   console.log('Employees table created.');
-- });

DROP DATABASE IF EXISTS employees;
CREATE TABLE employees_info (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(20), 
    last_name VARCHAR(20),
    title VARCHAR(20), 
    department VARCHAR(20), 
    salary INT , VARCHAR(20));
