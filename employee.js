const mysql = require('mysql');
const inquirer = require('inquirer');
const { exit } = require('process');

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
                    console.log('ADD test');
                    addFunction();
                    break;
                case 'VIEW':
                    console.log('VIEW test');
                    viewFunction();
                    break;   
                case 'UPDATE':
                    console.log('UPDATAE test');
                    updateFunction();
                    break;  
                default:
                    console.log('Thank you, exiting program.')
                    process.exit();
            }
        });
};

init();