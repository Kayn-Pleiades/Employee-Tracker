// Required packages/files
const password = require('../password.json');
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: password.mysql,
    database: 'employees_db'
});

// View employees
const viewEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    roleMenu();
  });
};

// Employee menu
function employeeMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View employees', 'Add an employee', 'Update the role of an employee', 'Return to main menu', 'Exit program']
      },
    ])
    .then((response) => {
      if (response.menu == 'View employees') {
        viewEmployee();
      }
      else if (response.menu == 'Add an employee') {
        console.log('add an employee');
      }
      else if (response.menu == 'Update the role of an employee') {
        console.log('update')
      }
      else if (response.menu == 'Return to main menu') {
        mainMenu();
      }
      else if (response.menu == 'Exit program') {
        connection.end();
      }
    })
}

// View roles
const viewRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    roleMenu();
  });
};

// Role menu
function roleMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View roles', 'Add a role', 'Return to main menu', 'Exit program']
      },
    ])
    .then((response) => {
      if (response.menu == 'View roles') {
        viewRole();
      }
      else if (response.menu == 'Add a role') {
        console.log('add a role');
      }
      else if (response.menu == 'Return to main menu') {
        mainMenu();
      }
      else if (response.menu == 'Exit program') {
        connection.end();
      }
    })
}

// View departments
const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    departmentMenu();
  });
};

// Department menu
function departmentMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View departments', 'Add a department', 'Return to main menu', 'Exit program']
      },
    ])
    .then((response) => {
      if (response.menu == 'View departments') {
        viewDepartment();
      }
      else if (response.menu == 'Add a department') {
        console.log('add a department');
      }
      else if (response.menu == 'Return to main menu') {
        mainMenu();
      }
      else if (response.menu == 'Exit program') {
        connection.end();
      }
    })
}

// Main menu
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to manage?',
        name: 'menu',
        choices: ['Departments', 'Roles', 'Employees', 'Exit program']
      },
    ])
    .then((response) => {
      if (response.menu == 'Departments') {
        departmentMenu();
      }
      else if (response.menu == 'Roles') {
        roleMenu();
      }
      else if (response.menu == 'Employees') {
        employeeMenu();
      }
      else if (response.menu == 'Exit program') {
        connection.end();
      }
    });
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    mainMenu();
  });