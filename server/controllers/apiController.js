const sqlActions = require('../sqlActions/sqlActions');

const apiController = {};

apiController.getAllEmployees = async (req, res, next) => {
  // not sure what the sql for getting all employees or if we need all employee data;
  try {
    res.locals.employees = await sqlActions.getEmployees();
    next();
  } catch {
    next({
      log: 'Error at apiController.getAllEmployees',
      status: 400,
      message: {
        err: 'apiController.getAllEmployees: Could not fetch data from PG',
      },
    });
  }
};

apiController.getEmployee = async (req, res, next) => {
  const { id, bossid } = req.query;
  console.log(req.query);
  console.log(id);
  try {
    res.locals.employee = await sqlActions.searchEmployees({
      bossid: bossid,
      employeeid: id,
    });
    next();
  } catch {
    next({
      log: 'Error at apiController.getEmployee',
      status: 400,
      message: {
        err: 'apiController.getEmployee: Could not fetch data from DB',
      },
    });
  }
};

apiController.addNewEmployee = async (req, res, next) => {
  try {
    res.locals.newEmployee = await sqlActions.createEmployee(req.body);
    next();
  } catch(error)
 { console.log(error);
    next({
      log: 'Error at apiController.addNewEmployee',
      status: 400,
      message: {
        err: 'apiController.addNewEmployee: Could not create employee in DB',
      },
    });
  }
};

apiController.updateEmployee = (req, res, next) => {
  const id = req.params.id;
  const newEmployee = req.body;
  try {
    res.locals.employee = sqlActions.updateEmployee(id, newEmployee); //sql update employee function
    return next();
  } catch {
    next({
      log: 'Error at apiController.updateEmployee',
      status: 400,
      message: {
        err: 'apiController.updateEmployee: Could not find and update employee!',
      },
    });
  }
};

apiController.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  try {
    res.locals.employee = await sqlActions.deleteEmployee(id);
    next();
  } catch {
    next({
      log: 'Error at apiController.deleteEmployee',
      status: 400,
      message: {
        err: 'apiController.updateEmployee: Could not find and update employee!',
      },
    });
  }
};

module.exports = apiController;
