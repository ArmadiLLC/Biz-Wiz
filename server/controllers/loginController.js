const sqlActions = require('../sqlActions/sqlActions');

const loginController = {};

loginController.signIn = (req, res, next) => {
  const { username, password } = req.body;
  // Hash password
  try {
    res.locals.userId = sqlActions.checkPassword(username, password);
    next();
  } catch {
    next({
      log: 'Error at loginController.signIn',
      status: 400,
      message: {
        err: 'loginController.signIn: Wrong Username/Password',
      },
    });
  }
};

loginController.signUp = (req, res, next) => {
  const { username, password } = req.body;
  try {
    res.locals.userId = sqlActions.addUser(username, password);
    next();
  } catch {
    next({
      log: 'Error at loginController.signUp',
      status: 400,
      message: {
        err: 'loginController.signUp: Error creating User in DB',
      },
    });
  }
};
module.exports = loginController;
