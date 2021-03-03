-- Makes it so all of the following code will affect employees_db --
USE employees_db;

-- Creates sample rows in department table --
INSERT INTO department (name)
VALUES ("Morning Musume");

INSERT INTO department (name)
VALUES ("ANGERME");

-- Creates sample rows in the role table --
INSERT INTO role (title, salary, department_id)
VALUES ("9th Generation", 100.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("10th Generation", 100.00, 1);

-- Creates sample rows in the employee table --
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Mizuki", "Fukumura", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Erina", "Ikuta", 1, 1);
