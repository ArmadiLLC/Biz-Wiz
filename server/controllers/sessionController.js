const sqlActions = require('../sqlActions/sqlActions');

const sessionController = {};

sessionController.createSession = (req, res, next) => {
  try {
    res.cookie({ ssid: sqlActions.startSession(res.locals.userId) });
    next();
  } catch {
    next({
      log: 'Error at sessionController.createSession',
      status: 400,
      message: {
        err: 'sessionController.createSession: Error: Can not create session',
      },
    });
  }
};
sessionController.checkSession = (req, res, next) => {
  try {
    sqlActions.checkSession(req.cookies.ssid);
    next();
  } catch {
    next({
      log: 'Error at sessionController.checkSession',
      status: 400,
      message: {
        err: 'sessionController.checkSession: Error: Could not find Session',
      },
    });
  }
};

module.exports = sessionController;
