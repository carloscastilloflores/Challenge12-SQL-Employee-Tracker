// const db = require("../config/connection");
// const cTable = require("console.table");
import db from '../config/connection.js';
import cTable from 'console.table';


class Dpt {
    constructor(id, dptm_name) {
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
        return db
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows; 
            })
    } 
}

export default Dpt ;
