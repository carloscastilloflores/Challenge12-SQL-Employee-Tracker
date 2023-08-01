import { Role } from '../role.js';
import { Employee } from '../employee.js';
import inquirer from 'inquirer';
import { mainMenu } from './menu.js';

async function promptEmployeeDetails(roles, mgrs) {
  const allManagers = [...mgrs, { id: 'None', first_name: 'None', last_name: '' }];
  const { firstname, lastname, roleid, manid } = await inquirer.prompt([
    { type: 'text', name: 'firstname', message: 'Enter first name.', validate: validateInput },
    { type: 'text', name: 'lastname', message: 'Enter last name.', validate: validateInput },
    { type: 'list', name: 'roleid', message: "What is the new employee's role?", choices: roles.map(formatChoice) },
    { type: 'list', name: 'manid', message: "Who is the new employee's manager?", choices: allManagers.map(formatChoice) },
  ]);
  return {
    firstname,
    lastname,
    roleId: roleid.split(' ')[0],
    managerId: manid.split(' ')[0] === 'None' ? null : manid.split(' ')[0],
  };
}

function formatChoice(item) {
  return `${item.id} - ${item.title || item.first_name + ' ' + item.last_name}`;
}

function validateInput(name) {
  if (!name) {
    console.log('Please enter a value!');
    return false;
  }
  return true;
}

export async function viewAllEmployeesMenu() {
  const emp = new Employee();
  const rows = await emp.getAll();
  console.log('\n.::All Employees::. ');
  console.table(rows);
  manageEmployeeMenu();
}

export function manageEmployeeMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'EmpMenu',
        message: 'What else would you like to do?',
        choices: ['Add an employee', 'Update an employee\'s role', 'Nothing, take me to the Main Menu'],
      },
    ])
    .then(({ EmpMenu }) => {
      console.clear();
      switch (EmpMenu) {
        case 'Add an employee':
          addEmployeeMenu();
          break;
        case 'Update an employee\'s role':
          updateEmployeeRoleMenu();
          break;
        case 'Nothing, take me to the Main Menu':
          mainMenu();
          break;
      }
    });
}

export async function addEmployeeMenu() {
  console.clear();
  const role = new Role();
  const mgr = new Employee();

  try {
    const [roles, mgrs] = await Promise.all([role.getAll(), mgr.getAll()]);
    const employeeDetails = await promptEmployeeDetails(roles, mgrs);

    const emp = new Employee(null, employeeDetails.firstname, employeeDetails.lastname, employeeDetails.roleId, employeeDetails.managerId);
    console.log('Employee:', emp);
    await emp.addEmployee();
    console.clear();
    viewAllEmployeesMenu();
    console.table('Added employee \n');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

export async function updateEmployeeRoleMenu() {
  console.clear();
  const role = new Role();
  const emp = new Employee();
  const [roles, emps] = await Promise.all([role.getAll(), emp.getAll()]);

  const { emp: empChoice, roleselect } = await inquirer.prompt([
    {
      type: 'list',
      name: 'emp',
      message: "Which employee's role do you want to update?",
      choices: emps.map(formatChoice),
    },
    {
      type: 'list',
      name: 'roleselect',
      message: 'Which role do you want to assign the selected employee?',
      choices: roles.map(formatChoice),
    },
  ]);

  const selectedEmpId = empChoice.split(' ')[0];
  const roleId = roleselect.split(' ')[0];

  try {
    const selectedEmp = await emp.getEmployeeById(selectedEmpId);
    const employee = new Employee(selectedEmp[0].id, selectedEmp[0].first_name, selectedEmp[0].last_name, roleId, selectedEmp[0].mgr_id);
    await employee.updateEmployee();
    console.log('\nUpdate was successful!');
    viewAllEmployeesMenu();
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}
