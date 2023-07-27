import { db } from '../server.js';
import cTable from 'console.table';


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
            .then (([row]) => {
                return row; 
            })
            .catch((error) => { // Add error handling
              console.error('Error while fetching employees:', error);
              throw error;
            });
    }

    // getAll(callback) {
    //   const sql = `SELECT * FROM employee`;
    //   db.query(sql, (error, rows) => {
    //     if (error) {
    //       callback(error, null);
    //     } else {
    //       callback(null, rows);
    //     }
    //   });
    // }

    addEmployee() {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const params = [this.first_name, this.last_name, this.role_id, this.manager_id];
      return db.promise().query(sql, params);
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
export { Employee };
