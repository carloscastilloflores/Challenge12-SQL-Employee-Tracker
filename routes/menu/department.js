import { Dpt } from '../dpt.js';
import inquirer from 'inquirer'; 
import menu from './menu.js'

export function viewDepartmentsMenu () {
    let viewDepartmentMenu = new Dpt(); 
    Dpt.getAll()
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
                menu.mainMenu(); 
                break;

            }
        });
    
}


export function addDptMenu () {
    inquirer
        .prompt ([
            {
                type: "text", 
                name: "newDptName", 
                message: "What is the name of the new department?", 
                validate: (dptname) => {
                    if (!dptname) {
                        console.log("There was an error, enter a department name."); 
                    }
                    return true;
                },
             },
        ])   
        .then(({ newDptName }) => {
            const dpt = new Dpt(null, newDptName); 
            dpt.addDpt(); 
            console.clear(); 
            viewDepartmentMenu(); 
            console.table("Added department \n");
        });
}

