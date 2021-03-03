-- Makes it so all of the following code will affect employees_db --
USE employees_db;

-- Creates sample rows in department table --
INSERT INTO department (id, name)
VALUES (1, "Morning Musume");

INSERT INTO department (id, name)
VALUES (2, "ANGERME");

-- Creates sample rows in the role table --
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "9th Generation", 100.00, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "10th Generation", 100.00, 1);

-- Creates sample rows in the employee table --
INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, "Mizuki", "Fukumura", 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Erina", "Ikuta", 1, 1);
