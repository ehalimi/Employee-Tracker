INSERT INTO departments (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4),
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 2),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 6, 1),
    ('Ashley', 'Rodriguez', 4, NULL),
    ('Kevin', 'Tupik', 8, 2),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 2, 3),
    ('Sarah', 'Lourd', 3, NULL),
    ('Tom', 'Allen', 7, 4);