const express = require('express');

//import controllers here:
const apiController = require('../controllers/apiController.js');

const router = express.Router();
router.get('/', apiController.getAllEmployees, (req, res) => {
  return res.status(200).json(res.locals.employees);
});
router.get('/query', apiController.getEmployee, (req, res) => {
  //example: /api/query?id=4&bossid=3
  return res.status(200).json(res.locals.employee);
});
router.post('/', apiController.addNewEmployee, (req, res) => {
  return res.status(200).json(res.locals.newEmployee);
});
router.patch('/:id', apiController.updateEmployee, (req, res) => {
  return res.status(200).json(res.locals.updatedEmployee);
});
router.delete('/:id', apiController.deleteEmployee, (req, res) => {
  return res.status(200).json(res.locals.deletedEmployee);
});

module.exports = router;
