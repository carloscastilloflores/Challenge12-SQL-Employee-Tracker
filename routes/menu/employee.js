import { Role }  from '../role.js'
import { Employee } from '../employee.js'
import inquirer from 'inquirer'; 
import { mainMenu } from './menu.js';

export function viewAllEmployeesMenu() {
    const emp = new Employee();
    emp
      .getAll()
      .then((rows) => {
        console.log(`
        
        .::All Employees::.`);
        console.table(rows);
      })
      .then(() => manageEmployeeMenu());
  }
  
export function manageEmployeeMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "EmpMenu",
          message: "What else would you like to do?",
          choices: [
            "Add an employee",
            "Update an employee's role",
            "Nothing, take me to the Main Menu",
          ],
        },
      ])
      .then(({ EmpMenu }) => {
        switch (EmpMenu) {
          case "Add an employee":
            console.clear();
            addEmployeeMenu();
            break;
          case "Update an employee's role":
            console.clear();
            updateEmployeeRoleMenu();
            break;
          case "Nothing, take me to the Main Menu":
            console.clear();
            mainMenu();
            break;
        }
      });
  }
  
  async function promptEmployeeDetails(roles, mgrs) {
    const allManagers = mgrs.map((m) => `${m.id} - ${m.first_name} ${m.last_name}`);
    allManagers.push('None');
  
    const { firstname, lastname, roleid, manid } = await inquirer.prompt([
      {
        type: 'text',
        name: 'firstname',
        message: 'Enter first name.',
        validate: (name) => {
          if (!name) {
            console.log('Please enter a first name for this employee!');
            return false;
          }
          return true;
        },
      },
      {
        type: 'text',
        name: 'lastname',
        message: 'Enter last name.',
        validate: (name) => {
          if (!name) {
            console.log('Please enter a last name for this employee!');
            return false;
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'roleid',
        message: "What is the new employee's role?",
        choices: roles.map((r) => `${r.id} - ${r.title}`),
      },
      {
        type: 'list',
        name: 'manid',
        message: "Who is the new employee's manager?",
        choices: allManagers,
      },
    ]);
  
    const truncRoleId = roleid.split(' ');
    const truncManId = manid.split(' ');
  
    return {
      firstname,
      lastname,
      roleId: truncRoleId[0],
      managerId: truncManId[0] === 'None' ? null : truncManId[0],
    };
  }
  
  export async function addEmployeeMenu() {
    console.clear();
    const role = new Role();
    const mgr = new Employee();
  
    try {
      const [roles, mgrs] = await Promise.all([role.getAll(), mgr.getAll()]);
      const employeeDetails = await promptEmployeeDetails(roles, mgrs);

      const emp = new Employee(
        null,
        employeeDetails.firstname,
        employeeDetails.lastname,
        employeeDetails.roleId,
        employeeDetails.managerId
      );
      console.log('Employee:', emp); 
      await emp.addEmployee();
      console.clear();
      viewAllEmployeesMenu();
      console.table('Added employee \n');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }
  
export function updateEmployeeRoleMenu() {
    console.clear();
    let role = new Role();
    role.getAll().then((roles) => {
        let emp = new Employee();
        emp.getAll().then((emps) => {
        inquirer
            .prompt([
            {
                type: "list",
                name: "emp",
                message: "Which employee's role do you want to update?",
                choices: emps.map((e) => {
                return `${e.id} - ${e.first_name} ${e.last_name}`;
                }),
            },
            {
                type: "list",
                name: "roleselect",
                message: "Which role do you want to assign the selected employee?",
                choices: roles.map((r) => {
                return `${r.id} - ${r.title}`;
                }),
            },
            ])
            .then(({ emp, roleselect }) => {
              let eid = emp.split(" ");
              let rid = roleselect.split(" ");
              let selectedEmp = new Employee(eid[0]);
              selectedEmp.getEmployeeById().then((sEmp) => {
                  sEmp = sEmp[0];
                  let employee = new Employee(
                  sEmp.id,
                  sEmp.first_name,
                  sEmp.last_name,
                  rid[0],
                  sEmp.mgr_id
                  );
                  employee.updateEmployee().then(() => {
                  console.log(`
                  
                  Update was successful!`);
                  viewAllEmployeesMenu();
                  });
              });
            });
        });
    });
}
