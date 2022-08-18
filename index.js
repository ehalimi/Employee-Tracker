const consoleTable = require('console.table');
const db = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const startQuestion = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'first_question',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }
    ]);
    // console.log(answers);

    if (answers.first_question ==="View All Employees") {
        return viewEmployees(); 
    } 
    else if (answers.first_question == "Add Employee") {
        return addEmployee(); 
    } 
    else if (answers.first_question == "Update Employee Role") {
        return updateEmployee();
    } 
    else if (answers.first_question == "View All Roles") {
        return viewRoles();
    } 
    else if (answers.first_question ==="Add Role"){
        return addRole();
    } 
    else if (answers.first_question ==="View All Departments"){
        db.query(`SELECT * FROM departments`, (err, data) => {
            if(err) console.error(err);
            console.log(consoleTable.getTable(data));
            startQuestion();
        });
    } 
    else if (answers.first_question ==="Add Department"){
        return addDepartment();
    } 
    else if (answers.first_question === "Quit") {
        console.log("Your task is completed!")
    }
    else {
        if(error.isTypeError){
            throw new error('TypeError' + error.message);
        } else {
            throw new error(error);
        }
    };
}

const viewEmployees = () => {
    const sql =`SELECT * FROM employees`;

    db.query(sql, (err, data) => {
        if (err) console.error(err);
        console.log(consoleTable.getTable(data));
        startQuestion();
    })
}

const addEmployee = () => {
    db.query(`SELECT * FROM roles`, (err, data) => {
    if(err) console.error(err);

    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?' 
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?' 
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employees role?',
            choices: data.map(role => {
                return { name: role.title, value: role.id }
            })
        },
        { 
            type: 'input',
            name: 'manager',
            message: 'What is the employees manager id?'
        }
    ])
    .then((answers) => {
        // console.log(answers);
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ("${answers.first_name}", "${answers.last_name}", "${answers.role}", "${answers.manager}")`;

        db.query(sql, (err, data) => {
            if(err) console.error(err);
            console.log("Added a new employee to the database");
            startQuestion();
        })
    })
    })    
}

const updateEmployee = () => {
    var employeeId = "";
    db.query(`SELECT * FROM employees`, (err, data) => {
        const choicesE = data.map(({ id, first_name, last_name }) => ({
            name: `${first_name}, ${last_name}`,
            value: id
        }))
        if(err) console.error(error);
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employees role would you like to update?',
                choices: choicesE
            }
        ])
        .then((answers) => {
            employeeId = answers.employee;
            db.query(`SELECT * FROM roles`, (err, data) => {
                const choicesR = data.map(({ id, title }) => ({
                    name: title,
                    value: id
                }))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'eRole',
                        message: 'Which role do you want to assign to the selected employee?',
                        choices: choicesR
                    }
                ])
                .then((answers) => {
                    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                    const params = [employeeId, answers.eRole]
            
                    db.query(sql, params, (err, answers) => {
                        if(err) console.error(err);
                        console.log("Updated employees role")
                        startQuestion();
                    })
                })
            })
        })
    })
}

const viewRoles = () => {
    const sql = `SELECT * FROM roles`
    
    db.query(sql, (err, data) => {
        if(err) console.error(err);
        console.log(consoleTable.getTable(data));
        startQuestion();
    }) 
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?' 
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?' 
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department id of the new role?',
        }
    ])
    .then((answers) => {
        const sql = `INSERT INTO roles (title, salary, department_id)
        VALUES ("${answers.title}", "${answers.salary}", "${answers.departmentId}")`;

        db.query(sql, (err, data) => {
            if(err) console.error(err);
            console.log("A role was added!");
            startQuestion();
        })
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?'
        }
    ])
    .then((answers) => {
        const sql = `INSERT INTO departments (name)
        VALUES ("${answers.name}")`;

        db.query(sql, (err, data) => {
            if (err) console.error(err);
            console.log("A department was added to the database");
            startQuestion();
        })
    })
}

startQuestion();
