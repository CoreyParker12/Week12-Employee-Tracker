// REFERENCES
//  1. https://www.guru99.com/joins.html

const mysql = require('mysql');
const inquirer = require('inquirer');

// ************************* INITIALIZE ************************* //

const connection = mysql.createConnection({
    host: 'localhost',


    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: '',
    database: 'cmsDB',
});

// ************************** HOMEPAGE ************************** //

// Functions inside:
//  addFunction()
//  viewFunction()
//  updateFunction()
const init = () => {
    inquirer
        .prompt({
            name: 'homepage',
            type: 'rawlist',
            message: 'Would you like to [ADD], [VIEW], or [UPDATE]?',
            choices: ['ADD', 'VIEW', 'UPDATE', 'xxx EXIT'],
        })
        .then((answer) => {
            switch(answer.homepage){
                case 'ADD':
                    addFunction();
                    break;
                case 'VIEW':
                    viewFunction();
                    break;   
                case 'UPDATE':
                    updateFunction();
                    break;  
                default:
                    exit();
            }
        });
};

// ********************* 1ST LEVEL OPTIONS ********************* //

// Functions inside:
//  addEmployee()
//  addRole()
//  addDepartment() 
const addFunction = () => {
    inquirer
        .prompt({
            name: 'addHomepage',
            type: 'rawlist',
            message: 'Would you like to add a(n) [EMPLOYEE], [ROLE], or [DEPARTMENT]?',
            choices: ['EMPLOYEE', 'ROLE', 'DEPARTMENT', '<-- BACK', 'xxx EXIT'],
        })
        .then((answer) => {
            switch(answer.addHomepage){
                case 'EMPLOYEE':
                    addEmployee();
                    break;
                case 'ROLE':
                    addRole();
                    break;   
                case 'DEPARTMENT':
                    addDepartment();
                    break; 
                case '<-- BACK':
                    init();
                    break;  
                default:
                    exit();
            }
        });
};

// Functions inside:
//  viewAll()
//  viewEmployee()
//  viewRole()
//  viewDepartment()
const viewFunction = () => {
    inquirer
        .prompt({
            name: 'viewHomepage',
            type: 'rawlist',
            message: 'Would you like to view a(n) [ALL], [EMPLOYEE], [ROLE], or [DEPARTMENT]?',
            choices: ['ALL', 'EMPLOYEE', 'ROLE', 'DEPARTMENT', '<-- BACK', 'xxx EXIT'],
        })
        .then((answer) => {
            switch(answer.viewHomepage){
                case 'ALL':
                    viewAll();
                    break;
                case 'EMPLOYEE':
                    viewEmployee();
                    break;
                case 'ROLE':
                    viewRole();
                    break;   
                case 'DEPARTMENT':
                    viewDepartment();
                    break;
                case '<-- BACK':
                    init();
                    break; 
                default:
                    exit();
            }
        });
};

// Functions inside:
//  updateRole()
//  updateManager()
//  updateDepartment()
const updateFunction = () => {
    inquirer
        .prompt({
            name: 'updateHomepage',
            type: 'rawlist',
            message: 'Would you like to update an employee [ROLE], [MANAGER], or [DEPARTMENT]?',
            choices: ['ROLE', 'MANAGER', 'DEPARTMENT', '<-- BACK', 'xxx EXIT'],
        })
        .then((answer) => {
            switch(answer.updateHomepage){
                case 'ROLE':
                    updateRole();
                    break;
                case 'MANAGER':
                    updateManager();
                    break;
                case 'DEPARTMENT':
                    updateDepartment();
                    break;  
                case '<-- BACK':
                    init();
                    break; 
                default:
                    exit();
            }
        });
};

// ********************* 2ND LEVEL [ADD] ********************* //

const addEmployee = () => {
    
        inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employee\'s [FIRST NAME]?',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the employee\'s [LAST NAME]?',
            },
            {
                name: 'title',
                type: 'rawlist',
                message: 'What is the employee\'s [ROLE]?',
                choices: pickRole()
            },
            {
                name: 'manager_id',
                type: 'rawlist',
                message: 'Who is the employee\'s manager?',
                choices: pickManager()
            },
        ])
        .then((answer) => {
            let pickedManager = pickManager().indexOf(answer.manager_id) + 1;
            let pickedRole = pickRole().indexOf(answer.title) + 1;
            connection.query('INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: pickedRole,
                    manager_id: pickedManager || null
                },
            );
            console.log('Added employee successfully!');
            init();
        });
};


const addRole = () => {
    connection.query('SELECT name AS name, id AS value FROM department', (err, choices) => {
        if (err) throw err
        inquirer
        .prompt([
            {
            name: 'title',
            type: 'input',
            message: 'What is the name of the [ROLE]?',
            },
            {
            name: 'salary',
            type: 'input',
            message: 'What is the [SALARY] of this [ROLE]?',
            },
            {
            name: 'department_id',
            type: 'rawlist',
            message: 'What is the [DEPARTMENT] of this [ROLE]?',
            choices
            },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query('INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
            );
            console.log('New [ROLE] Added Successfully!');
            init();
        });
    });
};

const addDepartment = () => {
    inquirer
    .prompt([
        {
        name: 'name',
        type: 'input',
        message: 'What is the name of the [DEPARTMENT]?',
        },
    ])
    .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query('INSERT INTO department SET ?',
        {
            name: answer.name
        },
        );
        console.log('New [DEPARTMENT] Added Successfully!')
        init();
    });
};

// ***************** SUBSET OF ADD EMPLOYEE ***************** //

let managerArray = [];
const pickManager = () => {
  connection.query('SELECT first_name FROM employee', (err, res) => {
    if (err) throw err
    for (let i = 0; i < res.length; i++) {
      managerArray.push(res[i].first_name);
    };
  });
  return managerArray;
};

let roleArray = [];
const pickRole = () => {
  connection.query('SELECT title FROM role', (err, res) => {
    if (err) throw err
    for (let i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    };
  });
  return roleArray;
};

// ******************** 2ND LEVEL [VIEW] ******************** //

const viewAll = () => {
    // INNER JOIN: Returns rows that satisfy both conditions
    // LEFT JOIN: Returns all of the rows of the initial condition, but null in the seconds condition where it does not apply
    connection.query(
    `SELECT employee.first_name AS FIRST_NAME,
    employee.last_name AS LAST_NAME,
    role.title AS JOB_TITLE,
    role.salary AS SALARY,
    department.name AS DEPARTMENT,
    CONCAT(joined.first_name, " " ,joined.last_name) AS MANAGER FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN department ON department.id = role.department_id
    LEFT JOIN employee joined ON employee.manager_id = joined.id`, (err, res) => {
        if (err) throw err
        console.table(res);
        init();
    });
};

const viewEmployee = () => {
    connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
        if (err) throw err
        console.table(res);
        init();
    });
};

const viewRole = () => {
    connection.query('SELECT title, salary from role', (err, res) => {
        if (err) throw err
        console.table(res);
        init();
    });
};

const viewDepartment = () => {
    connection.query('SELECT name FROM department', (err, res) => {
        if (err) throw err
        console.table(res);
        init();
    });
};

// ******************* 2ND LEVEL [UPDATE] ******************* //

const updateRole = () => {

};

const updateManager = () => {

};

const updateDepartment = () => {

};


// Function to exit from inquirer at the end of each switch statement
const exit = () => {
    console.log('Thank you, exiting program.')
    process.exit();
};

init();