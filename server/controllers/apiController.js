import sqlActions from "../sqlActions/sqlActions";

const apiController = {};

apiController.getAllEmployees = (req, res, next) => {
  // not sure what the sql for getting all employees or if we need all employee data;
  try {
    res.locals.employees = sqlActions.getEmployees();
    next();
  } catch {
    next({
      log: "Error at apiController.getAllEmployees",
      status: 400,
      message: {
        err: "apiController.getAllEmployees: Could not fetch data from PG",
      },
    });
  }
};

apiController.getEmployee = (req, res, next) => {
    const id = req.params.id;
    try {
        res.locals.employee = sqlActions.searchEmployees(id);
        next();
      } catch {
        next({
          log: "Error at apiController.getEmployee",
          status: 400,
          message: {
            err: "apiController.getEmployee: Could not fetch data from DB",
          },
        });
      };
};

apiController.addNewEmployee = (req , res, next) =>{
    try {
        res.locals.employee = sqlActions.createEmployee(req.body);
        next();
      } catch {
        next({
          log: "Error at apiController.addNewEmployee",
          status: 400,
          message: {
            err: "apiController.addNewEmployee: Could not create employee in DB",
          },
        });
      };
};

apiController.updateEmployee = (req , res , next) =>{
    const id = req.params.id;
    try {
        res.locals.employee = //sql update employee function
        next();
      } catch {
        next({
          log: "Error at apiController.updateEmployee",
          status: 400,
          message: {
            err: "apiController.updateEmployee: Could not find and update employee!",
          },
        });
      };
};

apiController.deleteEmployee = (req, res, next) =>{
  const id = req.params.id;
  try {
    res.locals.employee = sqlActions.deleteEmployee(id);
    next();
  } catch {
    next({
      log: "Error at apiController.deleteEmployee",
      status: 400,
      message: {
        err: "apiController.updateEmployee: Could not find and update employee!",
      },
    });
  };
}

module.exports = apiController;
