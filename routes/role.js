// const db = require("../config/connection");
// const cTable = require("console.table");

import { db } from '../server.js';
import cTable from 'console.table';


class Role {
    constructor(id, title, department, salary) {
    (this.id = id), 
        (this.title = title), 
        (this.department = department),
        (this.salary = salary);
    }
    
    getAll() {
        const sql = `SELECT * FROM emp_role`; 
        return db 
        .promise()
        .query(sql)
        .then (([rows]) => {
            return rows;
        });
    }
    addRole() {
        const sql = `INSERT INTO emp_role (title, salary, dpt_id) VALUES (?,?,?)` 
        const params = [this.title, this.salary, this.dpt_id];
        return db.promise().query(sql, params);
    }
}

export { Role } ; 