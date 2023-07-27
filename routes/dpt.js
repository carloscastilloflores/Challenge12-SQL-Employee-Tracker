// const db = require("../config/connection");
// const cTable = require("console.table");
import { db } from '../server.js';
import cTable from 'console.table';


class Dpt {
    constructor(id, dptm_name) {
        (this.id = id), (this.dptm_name = dptm_name);
    }
    getAll() {
        const sql = `SELECT * FROM department`;
        return db   
            .promise()
            .query(sql)
            .then (([rows]) => {
                return rows;
            });
    }

    addDpt() {
        const sql = `INSERT INTO department (dpt_name) VALUES (?)`;
        return db
            .promise()
            .query(sql, [this.dpt_name])
            .then(() => {
                console.log("Department added successfully!");
            })
            .catch((error) => {
                console.error("Error adding department:", error);
            });
    }
}

export { Dpt };
