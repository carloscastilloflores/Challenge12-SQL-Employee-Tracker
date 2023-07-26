// const db = require("../config/connection");
// const cTable = require("console.table");

import db from '../config/connection.js';
import cTable from 'console.table';


class Role {
    constructor(id, title, department, salary) {
    (this.id = id), 
        (this.title = title), 
        (this.department = department),
        (this.salary = salary);
    }
    
    getAll() {
        const sql = `SELECT * FROM title`; 
        return db 
        .promise()
        .query(sql, params)
        .then (([rows]) => {
            return rows;
        });
    }
    addRole() {
        const sql = `INSERT INTO emp_role (title, salary, dpt_id) VALUES ("${this.title}", "${this.salary}", "${this.dpt_id}")`;
        return db.promise().query(sql);
    }
}

export { Role } ; 