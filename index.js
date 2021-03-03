// Required packages/files
const password = require('../password.json');
const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

// Create connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: password.mysql,
  database: 'employees_db'
});

// Update an employee
// Update menu
const updateMenu = (id) => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to edit?',
        name: 'choice',
        choices: ['Change first name', 'Change last name', 'Change role', 'Change manager'],
      },
    ])
    .then((response) => {
      // Change first name
      if (response.choice == 'Change first name') {
        inquirer
          .prompt([
            {
              type: 'input',
              message: "What is the new first name of the employee?",
              name: 'firstName',
            },
          ])
          .then((response) => {
            connection.query(
              'UPDATE employee SET ? WHERE ?',
              [
                {
                  first_name: response.firstName,
                },
                {
                  id: id,
                },
              ],
              (err) => {
                if (err) throw err;
                inquirer
                  .prompt([
                    {
                      type: 'list',
                      message: 'Would you like to make additional edits to this employee?',
                      name: 'moreEdits',
                      choices: ['Yes', 'No. Please return me to the main menu'],
                    }
                  ])
                  .then((response) => {
                    if (response.moreEdits == 'Yes') {
                      updateMenu(id);
                    }
                    else {
                      mainMenu();
                    }
                  });
              }
            )
          });
      }
      // Change last name
      else if (response.choice == 'Change last name') {
        inquirer
          .prompt([
            {
              type: 'input',
              message: "What is the new last name of the employee?",
              name: 'lastName',
            },
          ])
          .then((response) => {
            connection.query(
              'UPDATE employee SET ? WHERE ?',
              [
                {
                  last_name: response.lastName,
                },
                {
                  id: id,
                },
              ],
              (err) => {
                if (err) throw err;
                inquirer
                  .prompt([
                    {
                      type: 'list',
                      message: 'Would you like to make additional edits to this employee?',
                      name: 'moreEdits',
                      choices: ['Yes', 'No. Please return me to the main menu'],
                    }
                  ])
                  .then((response) => {
                    if (response.moreEdits == 'Yes') {
                      updateMenu(id);
                    }
                    else {
                      mainMenu();
                    }
                  });
              }
            )
          });
      }
      // Change role
      else if (response.choice == 'Change role') {
        connection.query('SELECT * FROM role', (err, res) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: 'rawlist',
                message: 'What is the new role of the employee?',
                name: 'newRole',
                choices() {
                  const choiceArray = [];
                  res.forEach(({ title }) => {
                    choiceArray.push(title);
                  });
                  return choiceArray;
                },
              },
            ])
            .then((response) => {
              connection.query(
                'SELECT * FROM role WHERE ?',
                [
                  {
                    title: response.newRole,
                  },
                ],
                (err, res) => {
                  if (err) throw err;
                  const role = res[0].id;
                  connection.query(
                    'UPDATE employee SET ? WHERE ?',
                    [
                      {
                        role_id: role,
                      },
                      {
                        id: id,
                      },
                    ],
                    (err) => {
                      if (err) throw err;
                      inquirer
                        .prompt([
                          {
                            type: 'list',
                            message: 'Would you like to make additional edits to this employee?',
                            name: 'moreEdits',
                            choices: ['Yes', 'No. Please return me to the main menu'],
                          }
                        ])
                        .then((response) => {
                          if (response.moreEdits == 'Yes') {
                            updateMenu(id);
                          }
                          else {
                            mainMenu();
                          }
                        });
                    }
                  )
                }
              )
            })
        })
      }
      // Change manager
      else if (response.choice == 'Change manager') {
        connection.query('SELECT * FROM employee', (err, res) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: 'rawlist',
                message: 'Who is the new manager of the employee?',
                name: 'newManager',
                choices() {
                  const choiceArray = ['None'];
                  res.forEach(({ first_name, last_name }) => {
                    const name = first_name + ' ' + last_name;
                    choiceArray.append(name);
                  });
                  return choiceArray;
                },
              },
            ])
            .then((response) => {
              const manager_nameArray = response.newManager.split(' ');
              const firstName = manager_nameArray[0];
              const lastName = manager_nameArray[1];
              connection.query(
                'SELECT * FROM employee WHERE ? AND ?',
                    [
                      {
                        first_name: firstName,
                      },
                      {
                        last_name: lastName,
                      },
                    ],
                (err, res) => {
                  if (err) throw err;
                  const manager = res[0].id;
                  connection.query(
                    'UPDATE employee SET ? WHERE ?',
                    [
                      {
                        manager_id: manager,
                      },
                      {
                        id: id,
                      },
                    ],
                    (err) => {
                      if (err) throw err;
                      inquirer
                        .prompt([
                          {
                            type: 'list',
                            message: 'Would you like to make additional edits to this employee?',
                            name: 'moreEdits',
                            choices: ['Yes', 'No. Please return me to the main menu'],
                          }
                        ])
                        .then((response) => {
                          if (response.moreEdits == 'Yes') {
                            updateMenu(id);
                          }
                          else {
                            mainMenu();
                          }
                        });
                    }
                  )
                }
              )
            })
        })
      }
    });
}

// Selects employee to update
const selectEmployee = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'rawlist',
          message: 'Please select the employee you wish to edit',
          name: 'select',
          choices() {
            const choiceArray = [];
            res.forEach(({ first_name, last_name }) => {
              const name = first_name + ' ' + last_name;
              choiceArray.push(name);
            });
            return choiceArray;
          },
        },
      ])
      .then((response) => {
        const manager_nameArray = response.select.split(' ');
        const firstName = manager_nameArray[0];
        const lastName = manager_nameArray[1];

        connection.query(
          'SELECT * FROM employee WHERE ? AND ?',
          [
            {
              first_name: firstName,
            },
            {
              last_name: lastName,
            },
          ],
          (err, res) => {
            if (err) throw err;
            const id = res[0].id;
            updateMenu(id);
          }
        )
      })
  })
}

// Add employee
const addEmployee = (first, last, role, manager) => {
  connection.query(
    'INSERT INTO employee SET ?',
    {
      first_name: first,
      last_name: last,
      role_id: role,
      manager_id: manager,
    },
    (err) => {
      if (err) throw err;
      viewEmployee();
    }
  )
}

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
            const first = response.first;
            const last = response.last;
            const role = res[0].id;
            if (response.manager == 'Yes') {
              connection.query('SELECT * FROM employee', (err, res) => {
                if (err) throw err;
                inquirer
                  .prompt([
                    {
                      type: 'rawlist',
                      message: 'Who is the manager of this employee?',
                      name: 'managerName',
                      choices() {
                        const choiceArray = [];
                        res.forEach(({ first_name, last_name }) => {
                          const name = first_name + ' ' + last_name;
                          choiceArray.push(name);
                        });
                        return choiceArray;
                      },
                    },
                  ])
                  .then((response) => {
                    const manager_nameArray = response.managerName.split(' ');
                    const firstName = manager_nameArray[0];
                    const lastName = manager_nameArray[1];

                    connection.query(
                      'SELECT * FROM employee WHERE ? AND ?',
                      [
                        {
                          first_name: firstName,
                        },
                        {
                          last_name: lastName,
                        },
                      ],
                      (err, res) => {
                        if (err) throw err;
                        const manager = res[0].id;
                        addEmployee(first, last, role, manager);
                      }
                    )
                  })
              })
            }
            else if (response.manager == 'No') {
              const manager = null;
              addEmployee(first, last, role, manager);
            }
          })
      });
  });
};

// View employees
const viewEmployee = () => {
  connection.query(`SELECT A.id AS ID, CONCAT(A.first_name, ' ', A.last_name) AS Name, department.name AS Department, role.title AS Role, role.salary AS Salary, CONCAT(B.first_name, ' ', B.last_name) AS Manager FROM (((employee A LEFT JOIN role ON A.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee B ON A.manager_id = B.id )`, (err, res) => {
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
        choices: ['Add an employee', 'Update an employee', 'Return to main menu', 'Exit program'],
      },
    ])
    .then((response) => {
      if (response.menu == 'Add an employee') {
        employeeInfo();
      }
      else if (response.menu == 'Update an employee') {
        selectEmployee();
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
  connection.query('SELECT role.id AS ID, department.name AS Department, role.title AS Role, role.salary AS Salary FROM (role LEFT JOIN department ON role.department_id = department.id)', (err, res) => {
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
        choices: ['Add a role', 'Return to main menu', 'Exit program'],
      },
    ])
    .then((response) => {
      if (response.menu == 'Add a role') {
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
  connection.query('SELECT department.id AS ID, department.name AS Department FROM department', (err, res) => {
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
        choices: ['Add a department', 'Return to main menu', 'Exit program'],
      },
    ])
    .then((response) => {
      if (response.menu == 'Add a department') {
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
        viewDepartment();
      }
      else if (response.menu == 'Roles') {
        viewRole();
      }
      else if (response.menu == 'Employees') {
        viewEmployee();
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