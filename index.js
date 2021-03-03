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
        afterConnection();
      }
      else if (response.menu == 'Add a department') {
        console.log('add a department');
      }
      else if (response.menu == 'Return to main menu') {
        mainMenu();
      }
      else if (response.menu == 'Exit program') {
        console.log('exit');
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
        console.log('Roles Menu');
      }
      else if (response.menu == 'Employees') {
        console.log('Employees Menu');
      }
      else if (response.menu == 'Exit program') {
        console.log('End');
      }
    });
}

const afterConnection = () => {
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      console.table(res);
      departmentMenu();
    });
  };

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    mainMenu();
  });