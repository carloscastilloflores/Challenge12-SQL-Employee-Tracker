const db = require("../config/connection");
const cTable = require("console.table");

class Department {
    constructor(id, dpt_name) {
        (this.id = id), (this.dptm_name = dptm_name);
    }
    getAll() {
        const sql = `SELECT * FROM department`;
        return db   
            .promise
            .query(sql)
            .then (([rows]) => {
                return rows;
            });
    }
    addDpt() {
        const sql = `INSERT INTO department (dptm_name) VALUES ("${this.dpt_name}")`;
        return db.promise().query(sql);
    } 
}

module.exporrts = Dpt; 