const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'sph12345',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

const inquirerQuestions = ["view all departments", "view all roles", "view all employees",
    "add a department", "add a role", "add an employee", "update an employee role"]

inquirer
.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'starterQ',
        choices: inquirerQuestions,
    },
])
.then((data) => {
    if (data.starterQ == "add a department"){
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'addDepartment',
                message: 'What is the name of the department?',
            },
        ])
        .then((data) => {
            // ????
        });
    }else if (data.starterQ == "add a role"){
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                message: 'What is the department the role is in?',
                name: 'roleDepartment',
                // choices: departments,
            },
        ])
        .then((data) => {
            // ????
        });
    }else if (data.starterQ == "add an employee"){
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'fName',
                message: 'What is their first name?',
            },
            {
                type: 'input',
                name: 'lName',
                message: 'What is their last name?',
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: 'What is the employees role?',
            },
            {
                type: 'list',
                message: 'Who is the employees manager?',
                name: 'employeeMan',
                // choices: Managers,
            },
        ])
        .then((data) => {
            // ????
        });
    }else if (data.starterQ == "update an employee role"){
        inquirer
        .prompt([
            {
                type: 'list',
                message: 'What employee do you want to update?',
                name: 'employeeName',
                // choices: employee,
            },
            {
                type: 'list',
                message: 'What is there new role',
                name: 'updateRole',
                // choices: roles,
            },
        ])
        .then((data) => {
            // ????
        });
    }
});


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});