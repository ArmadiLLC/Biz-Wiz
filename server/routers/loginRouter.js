const express = require("express");

//import controllers here:
const loginController = require("../controllers/loginController.js");
const sessionController = require("../controller/sessionController.js");

const loginRouter = express.Router();

loginRouter.get('/', loginController.signIn, sessionController.checkSession,  (req, res) =>{
    return res.status(200).json();
});

loginRouter.post('/', loginController.signUp, sessionController.createSession,  (req, res) =>{
    return res.status(200).json(res.locals.cookie);
})

module.exports = loginRouter;
