import { Role }  from "../role.js";
import { Dpt } from "../dpt.js";
import inquirer from "inquirer";
import { mainMenu } from './menu.js';

export function viewAllRolesMenu() {
  const role = new Role();
  role
    .getAll()
    .then((rows) => {
      console.log(".::All Roles::.");
      console.table(rows);
    })
    .then(() => manageRoleMenu());
}

export function manageRoleMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "RoleMenu",
        message: "What else would you like to do?",
        choices: ["Add a role", "Nothing, take me to the Main Menu"],
      },
    ])
    .then(({ RoleMenu }) => {
      switch (RoleMenu) {
        case "Add a role":
          console.clear();
          addRoleMenu();
          break;
        case "Nothing, take me to the Main Menu":
          console.clear();
          mainMenu();
          break;
      }
    });
}

export async function promptRoleDetails(departments) {
  const { newRoleName, roleSalary, newRoleDpt } = await inquirer.prompt([
    {
      type: 'text',
      name: 'newRoleName',
      message: 'What is the name of this new role?',
      validate: (rolename) => {
        if (!rolename) {
          console.log('Please enter a name for this role!');
          return false;
        }
        return true;
      },
    },
    {
      type: 'text',
      name: 'roleSalary',
      message: 'How much does this role make per year?',
      validate: (salary) => {
        if (!salary) {
          console.log('Please enter a yearly salary for this role!');
          return false;
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'newRoleDpt',
      message: 'What department does this role belong to?',
      choices: departments.map((d) => ({
        name: `${d.id}--${d.dpt_name}`,
        value: d.id,
      })),
    },
  ]);

  return {
    newRoleName,
    roleSalary: parseFloat(roleSalary),
    departmentId: newRoleDpt,
  };
}

export async function addRoleMenu() {
  console.clear();
  const dpt = new Dpt();

  try {
    const departments = await dpt.getAll();
    console.log('Departments:', departments); // Debug logging

    const roleDetails = await promptRoleDetails(departments);
    console.log('Role Details:', roleDetails); // Debug logging

    const role = new Role(null, roleDetails.newRoleName, roleDetails.roleSalary, roleDetails.departmentId);
    await role.addRole();
    console.clear();
    viewAllRolesMenu();
    console.table('Added role \n');
  } catch (error) {
    console.error('Error adding role:', error);
  }
}
