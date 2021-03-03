-- Drops the database if it currently exists --
DROP DATABASE IF EXISTS employees_db;
-- Creates the database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect employees_db --
USE employees_db;

-- Creates table for department --
CREATE TABLE department (
    -- Makes a numeric column called "id" which cannot contain null --
    id INTEGER NOT NULL AUTO_INCREMENT,
    -- Makes a string column called "name" which cannot contain null --
    name VARCHAR(30) NOT NULL,
    -- Sets id as primary key --
    PRIMARY KEY (id)
);

-- Creates table for role -- 
CREATE TABLE role (
    -- Makes a numeric column called "id" which cannot contain null --
    id INTEGER NOT NULL AUTO_INCREMENT,
    -- Makes a string column called "title" which cannot contain null --
    title VARCHAR(30) NOT NULL,
    -- Makes a decimal column called "salary" which cannot contain null --
    salary DECIMAL NOT NULL,
    -- Makes a numeric column called "department_id" which cannot contain null to hold reference to the department the role belongs to --
    department_id INTEGER NOT NULL, 
    -- Sets id as primary key --
    PRIMARY KEY (id)
);

-- Creates table for employee --
CREATE TABLE employee (
    -- Makes a numeric column called "id" which cannot contain null --
    id INTEGER NOT NULL AUTO_INCREMENT,
    -- Makes a string column called "first_name" which cannot contain null --
    first_name VARCHAR(30) NOT NULL,
    -- Makes a string column called "last_name" which cannot contain null --
    last_name VARCHAR(30) NOT NULL,
    -- Makes a numeric column called "role_id" which cannot contain null to hold reference to the role the employee belongs to --
    role_id INTEGER NOT NULL, 
    -- Makes a numeric column called "manager_id" which, if applicable, holds reference to the employee that manages the one being created --
    manager_id INTEGER,
    -- Sets id as primary key --
    PRIMARY KEY (id)
);