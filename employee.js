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
            choices: ['EMPLOYEE', 'ROLE', 'DEPARTMENT', 'BACK', 'EXIT'],
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
                case 'BACK':
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
            choices: ['ALL', 'EMPLOYEE', 'ROLE', 'DEPARTMENT', 'BACK', 'EXIT'],
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
                case 'BACK':
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
            choices: ['ROLE', 'MANAGER', 'DEPARTMENT', 'BACK', 'EXIT'],
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
                case 'BACK':
                    init();
                    break; 
                default:
                    exit();
            }
        });
};

// ********************* 2ND LEVEL [ADD] ********************* //

const addEmployee = () => {
    
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err
        const choices = res.map(item => { return item.title});

    
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
                choices: choices
            },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query('INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,

                },

            );

            console.log(`${answer.first_name} ${answer.last_name} was successfully added in the [      ] department with manager [     ]!`)
            init();

        });
    });
};

const addRole = () => {
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
    ])
    .then((answer) => {
        // when finished prompting, insert a new item into the db with that info
        connection.query('INSERT INTO role SET ?',
        {
            title: answer.title,
            salary: answer.salary,
        },
        );
        console.log(`The job of ${answer.title} was successfully added with a salary of: $${answer.salary}!`)
        init();
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
        console.log(`The department of ${answer.name} was successfully added!`)
        init();
    });
};

// ******************** 2ND LEVEL [VIEW] ******************** //

const viewAll = () => {

};

const viewEmployee = () => {

};

const viewRole = () => {

};

const viewDepartment = () => {

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