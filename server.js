const express = require('express');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
import inquirer from 'inquirer'; 
import { mainMenu } from './routes/menu/menu';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CarlosACF36286269.',
  database: 'employees_info'
},
console.log(`Connected to the employees database.`)
);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});


//   // When clicked "View All Employees i want to see the table of employe, for that i need a database that retrieves information
// db.query('SELECT (*) FROM employees', function (err, results) {
//   console.log(results);
// });


mainMenu();
  // promises

