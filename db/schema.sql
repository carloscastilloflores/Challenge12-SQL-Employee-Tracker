DROP DATABASE IF EXISTS employees; 
CREATE DATABASE employees;

USE employees;

CREATE TABLE employees_info (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(20), 
    last_name VARCHAR(20),
    title VARCHAR(20), 
    department VARCHAR(20), 
    salary DECIMAL NOT NULL
);