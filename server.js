const inquirer = require('inquirer');
const mysql = require('mysql2');

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
    "add a department", "add a role", "add an employee", "update an employee role"
]

let runFunction = function(){
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
        if (data.starterQ == "view all departments"){
            db.query("SELECT * FROM department",(err,res)=>{
                if (err) throw err
                let departmentSearch= res
                console.log(departmentSearch)
            })
        }else if (data.starterQ == "view all roles"){
            db.query("SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON role.department_id = department.id",(err,res)=>{
                if (err) throw err
                let roleSearch= res
                console.log(roleSearch)
            })
        }else if (data.starterQ == "view all employees"){
            db.query("SELECT e.id, e.first_name, e.last_name, role.title, role.salary, department.department_name, CONCAT(m.first_name, ', ', m.last_name) AS manager FROM employee e JOIN role ON e.role_id = role.id JOIN department ON role.department_id = department.id LEFT OUTER JOIN employee m ON e.manager = m.id ORDER BY e.id",(err,res)=>{
                if (err) throw err
                let employeeSearch= res
                console.log(employeeSearch)
            })
            console.log("view all employees")
        }else if (data.starterQ == "add a department"){
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'department_name',
                    message: 'What is the name of the department?',
                },
            ])
            .then((data) => {
                console.log(data)
                // add department
            });
        }else if (data.starterQ == "add a role"){
            db.query("SELECT * FROM department",(err,res)=>{
                if (err) throw err
                let departmentChoices= res.map(({id, department_name})=>({
                    name:department_name,
                    value:id,
                }))
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the name of the role?',
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                    },
                    {
                        type: 'list',
                        message: 'What is the department the role is in?',
                        name: 'department_id',
                        choices: departmentChoices,
                    },
                ])
                .then((data) => {
                    console.log(data)
                    // add role
                });
            });
        }else if (data.starterQ == "add an employee"){
            db.query("SELECT * FROM role",(err,res)=>{
                if (err) throw err
                console.log(res)
                let roleChoices= res.map(({id, title})=>({
                    name:title,
                    value:id,
                }))
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
                        type: 'list',
                        name: 'employeeRole',
                        message: 'What is the employees role?',
                        choices: roleChoices
                    },
                ])
                .then((data) => {
                    console.log(data)
                    let addEmployeeOne = data
                    db.query("SELECT * FROM employee WHERE manager IS NULL",(err,res)=>{
                        if (err) throw err
                        console.log(res)
                        let managerChoices= res.map(({id, first_name, last_name})=>({
                            name:`${first_name} ${last_name}`,
                            value:id,
                        }))
                        inquirer
                        .prompt([
                            {
                                type: 'list',
                                message: 'Who is the employees manager?',
                                name: 'employeeMan',
                                choices: managerChoices,
                            },
                        ])
                        .then((data) => {
                            let addEmployeeFull = { first_name: addEmployeeOne.fName, last_name: addEmployeeOne.lName, role_id: addEmployeeOne.employeeRole, manager: data.employeeMan}
                            console.log(addEmployeeFull)
                            // write in data
                        });
                    });
                });
            })
            
        }else if (data.starterQ == "update an employee role"){
            db.query("SELECT * FROM employee",(err,res)=>{
                if (err) throw err
                let employeeSearch= res.map(({id, first_name, last_name})=>({
                    name:`${first_name} ${last_name}`,
                    value:id,
                }))
                inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'What employee do you want to update?',
                        name: 'employeeName',
                        choices: employeeSearch,
                    },
                ])
                .then((data) => {
                    let employeeSearchData= data
                    db.query("SELECT * FROM role",(err,res)=>{
                        if (err) throw err
                        let roleChoices= res.map(({id, title})=>({
                            name:title,
                            value:id,
                        }))
                        inquirer
                        .prompt([
                            {
                                type: 'list',
                                message: 'What is there new role',
                                name: 'updateRole',
                                choices: roleChoices,
                            },
                        ])
                        .then((data) => {
                            let updateEmployeeFull = { id: employeeSearchData.employeeName, role_id: data.updateRole}
                            console.log(updateEmployeeFull)
                            // update employee
                        });
                    });
                });
            });
        }
    });
}

runFunction()