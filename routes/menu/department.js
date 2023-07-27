import { Dpt } from '../dpt.js';
import inquirer from 'inquirer'; 
import { mainMenu } from './menu.js';

export function viewDepartmentsMenu () {
    let viewDepartmentMenu = new Dpt(); 
    viewDepartmentMenu
    .getAll()
    .then ((rows) => {
        console.log(`
        =================
         All Departments
        =================
        `);
        console.table(rows);
    })
    .then(() => {
        manageDptMenu();
    });
}

export function manageDptMenu () {
    inquirer
        .prompt([
            {
                type: "list", 
                name: "DptMenu", 
                message: "What else would you like to do?", 
                choices: ["Add department", "Nothing, take me to the Main Menu"],
            },
        ])
        .then(({ DptMenu }) => {
            switch (DptMenu) {
              case "Add departament": 
                console.clear(); 
                addDptMenu(); 
                break; 
              case "Nothing, take me to the Main Menu": 
                console.clear(); 
                mainMenu(); 
                break;

            }
        });
    
}


export async function addDptMenu() {
    try {
      const { newDptName } = await inquirer.prompt([
        {
          type: "text",
          name: "newDptName",
          message: "What is the name of the new department?",
          validate: (dptname) => {
            if (!dptname) {
              console.log("There was an error, enter a department name.");
              return false; // Return false on validation failure
            }
            return true; // Return true on successful validation
          },
        },
      ]);
  
      const dpt = new Dpt(null, newDptName);
      await dpt.addDpt();
  
      console.clear();
      viewDepartmentsMenu();
      console.table("Added department \n");
    } catch (error) {
      console.error("Error adding department:", error);
    }
  }

