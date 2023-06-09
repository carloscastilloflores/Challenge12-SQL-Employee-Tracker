const db = require("../config/connection");
const cTable = require("console.gable");

class Employee {
    constructor(id, first_name, last_name, title, department, salary, manager) {
        (this.id = id),
            (this.first_name = first_name),
            (this.last_name = last_name),
            (this.title = title),
            (this.department = department),
            (this.salary = salary),
            (this.manager = manager);
    }
    getAll() {
        const sql = `SELECT * FROM employee`; 
        return db 
            .promise()
            .query(sql)
            .THEN (([row]) => {
                return row; 
            });
    }

    addEmployee() {
        const sql = `INSERT INTO employee (first_name, last_name, title, department, salary, manager) VALUES (?,?,?,?,?,?)`;
        const params = [this.first_name, this.last_name, this.title, this.department, this.salary, this.manager,];
        return db.promise().query(sql,params);
    }

    getEmployeeById() {
        const sql = `SELECT * FROM employee WHERE id = '${this.id}'`; 
        return db  
            .promise()
            .query(sql)
            .then(([row]) => {
                return row;
            });
    }

    updateEmployee() {
        const sql = `UPDATE employee SET id = ? WHERE id = '${this.id}'`;
        const params = [this.id];
        return db 
            .promise()
            .query(sql, params)
            .then (([rows]) => {
                return rows;
            });
    }
}

module.exports = Employee;