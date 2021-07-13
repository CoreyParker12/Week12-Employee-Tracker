const mysql = require('mysql');
const inquirer = require('inquirer');

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
            choices: ['ADD', 'VIEW', 'UPDATE', 'EXIT'],
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
            choices: ['EMPLOYEE', 'ROLE', 'DEPARTMENT', 'EXIT'],
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
            choices: ['ALL', 'EMPLOYEE', 'ROLE', 'DEPARTMENT', 'EXIT'],
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
            choices: ['ROLE', 'MANAGER', 'DEPARTMENT', 'EXIT'],
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
                default:
                    exit();
            }
        });
};


// Function to exit from inquirer at the end of each switch statement
const exit = () => {
    console.log('Thank you, exiting program.')
    process.exit();
};

init();