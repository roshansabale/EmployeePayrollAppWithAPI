const controller = require('../controllers/employeeController');

let express = require('express');
let router = express.Router();
//adding employee details
router.post("/add", controller.employeeController);
router.get("/get", controller.getAll);
router.put("/employees/:employee_id", controller.updateEmployee);
router.delete("/remove/:employee_id", controller.removeEmployee);
router.get("/search/:employee_name", controller.searchByName);
module.exports = router