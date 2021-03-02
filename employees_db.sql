-- Drops the database if it currently exists --
DROP DATABASE IF EXISTS employees_db;
-- Creates the database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect employees_db --
USE employees_db;

-- Creates table for department --
CREATE TABLE department (
    -- Makes a numeric column called "id" which cannot contain  null --
    id INTEGER NOT NULL AUTO_INCREMENT,
    -- Makes a string column called "name" which cannot contain null --
    name VARCHAR(30) NOT NULL,
    -- Sets id as primary key --
    PRIMARY KEY (id)
);
