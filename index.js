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

// Asks information needed to add an employee
const employeeInfo = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the first name of the employee?',
          name: 'first',
        },
        {
          type: 'input',
          message: 'What is the last name of the employee?',
          name: 'last',
        },
        {
          type: 'rawlist',
          message: 'What role does this employee have?',
          name: 'role',
          choices() {
            const choiceArray = [];
            res.forEach(({ title }) => {
              choiceArray.push(title);
            });
            return choiceArray;
          },
        },
        {
          type: 'list',
          message: 'Does this employee have a manager?',
          name: 'manager',
          choices: ['Yes', 'No'],
        }
      ])
      .then((response) => {
        connection.query(
          'SELECT * FROM role WHERE ?',
          [
            {
              title: response.role,
            },
          ],
          (err, res) => {
            if (err) throw err;
            const role = res[0].id;
            if (response.manager == 'Yes') {
              console.log(role);
            }
            else if (response.manager == 'No') {
              console.log(role);
            }
          })
      });
  });
};

// View employees
const viewEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeMenu();
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
        choices: ['View employees', 'Add an employee', 'Update the role of an employee', 'Return to main menu', 'Exit program'],
      },
    ])
    .then((response) => {
      if (response.menu == 'View employees') {
        viewEmployee();
      }
      else if (response.menu == 'Add an employee') {
        employeeInfo();
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

// Add Role
const addRole = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the title of the role?',
          name: 'title',
        },
        {
          type: 'input',
          message: 'What is the salary of this role',
          name: 'salary',
        },
        {
          type: 'rawlist',
          message: 'What department is this role in?',
          name: 'department',
          choices() {
            const choiceArray = [];
            res.forEach(({ name }) => {
              choiceArray.push(name);
            });
            return choiceArray;
          },
        }
      ])
      .then((response) => {
        connection.query(
          'SELECT * FROM department WHERE ?',
          [
            {
              name: response.department,
            },
          ],
          (err, res) => {
            if (err) throw err;
            connection.query(
              'INSERT INTO role SET ?',
              {
                title: response.title,
                salary: response.salary,
                department_id: res[0].id,
              },
              (err) => {
                if (err) throw err;
                viewRole();
              }
            )
          })
      });
  });
};

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
        choices: ['View roles', 'Add a role', 'Return to main menu', 'Exit program'],
      },
    ])
    .then((response) => {
      if (response.menu == 'View roles') {
        viewRole();
      }
      else if (response.menu == 'Add a role') {
        addRole();
      }
      else if (response.menu == 'Return to main menu') {
        mainMenu();
      }
      else if (response.menu == 'Exit program') {
        connection.end();
      }
    })
}

// Add department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'name'
      }
    ])
    .then((response) => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: response.name,
        },
        (err) => {
          if (err) throw err;
          viewDepartment();
        }
      );
    });
};

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
        choices: ['View departments', 'Add a department', 'Return to main menu', 'Exit program'],
      },
    ])
    .then((response) => {
      if (response.menu == 'View departments') {
        viewDepartment();
      }
      else if (response.menu == 'Add a department') {
        addDepartment();
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
        choices: ['Departments', 'Roles', 'Employees', 'Exit program'],
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