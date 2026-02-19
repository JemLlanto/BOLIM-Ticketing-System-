const express = require("express");
const {
  get_departments_controller,
  create_departments_controller,
  update_department_controller,
  delete_department_controller,
} = require("../controllers/department.controller");

const router = express.Router();

router.get("/fetch-departments", get_departments_controller);
router.post("/create-department", create_departments_controller);
router.put("/update-department/:id", update_department_controller);
router.delete("/delete-department/:id", delete_department_controller);

module.exports = router;
