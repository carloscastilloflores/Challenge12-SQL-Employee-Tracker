import inquirer from 'inquirer';
// const { viewDepartmentsMenu, addDptMenu } = require("./routes/department.js");
import { viewDepartmentsMenu, addDptMenu  } from './department.js';
import { viewAllRolesMenu,addRoleMenu  } from './role.js';
import { viewAllEmployeesMenu, addEmployeeMenu, updateEmployeeRoleMenu  } from './employee.js';
// const { viewAllRolesMenu, addRoleMenu } = require("./routes/role.js");
// const {
//   viewAllEmployeesMenu,
//   addEmployeeMenu,
//   updateEmployeeRoleMenu,
// } = require("./routes/employee.js");

export function mainMenu() {
  inquirer
  .prompt(
    {
    type:'list',
    name: 'menuSelect',
    message: 'What would you like to do?',
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Exit",
      // { name: 'View All Employees', value: 'something' },
      // { name: 'Add Employee', value: 'something' },
      // { name: 'Update Employee Role', value: 'something' },
      // { name: 'View All Roles', value: 'something' },
      // { name: 'View All Departments', value: 'something' },
      // { name: 'Add Departments', value: 'something' },
      // { name: 'Quit', value: 'something' }, 
    ],
    default: "View All Employees",
  })
  .then (({menuSelect}) => {
    switch ({menuSelect}) {
      case "View All Employees":
        console.clear();
        viewAllEmployeesMenu();
        break;
      case "Add Employee":
        console.clear();
        addEmployeeMenu();
        break;
      case "Update Employee Role":
        console.clear();
        updateEmployeeRoleMenu();
        break;
      case "View All Roles":
        console.clear();
        viewAllRolesMenu();
        break;
      case "Add Role":
        console.clear();
        addRoleMenu();
        break;
      case "View All Departments":
        console.clear();
        viewDepartmentsMenu();
        break;
      case "Add Department":
        console.clear();
        addDptMenu();
        break;
      case "Exit":
        console.clear();
        exit();
        break;
    }
  })
}

  function exit() {
    console.clear();
    console.log("Shutting down... hit ctrl + c and use 'npm start' to reboot");
  }
  
export default  mainMenu;