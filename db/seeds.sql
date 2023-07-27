USE employees; -- Replace 'your_database_name' with your actual database name

INSERT INTO department (dpt_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO emp_role (title, salary, dpt_id)
VALUES 
    ("Sales Lead", '100000', 1),
    ("Salesperson", '80000', 1),
    ("Lead Engineer", '150000', 2),
    ("Software Engineer", '120000', 2),
    ("Account Manager", '160000', 3),
    ("Accountant", '125000', 3),
    ("Legal Team Lead", '250000', 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    ('1', 'John', 'Doe', 1, NULL),
    ('2', 'Mike', 'Chan', 1, 1), 
    ('3', 'Ashley', 'Rodriguez', 2, NULL), 
    ('4', 'Kevin', 'Tupik', 2, 2),
    ('5', 'Kunal', 'Singh', 3, NULL),
    ('6', 'Malia', 'Brown', 3, 3),
    ('7', 'Sarah', 'Lourd', 4, NULL),
    ('8', 'Tom', 'Allen', 4, 4);