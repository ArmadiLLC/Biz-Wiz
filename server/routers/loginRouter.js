const express = require("express");

//import controllers here:
const loginController = require("../controllers/loginController.js");


const loginRouter = express.Router();

// is sign on page the first thing? if so sign in redirects to sendFile(index.html)...
loginRouter.get('/', loginController.signIn, (req, res) =>{
    return res.status(200).json(res.locals.userId);
});

loginRouter.post('/', loginController.SignUp, (req, res) =>{
    return res.status(200).json(res.locals.userId);
})

module.exports = loginRouter;