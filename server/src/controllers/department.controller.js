const departments_service = require("../services/department.service");

const get_departments_controller = async (req, res, next) => {
  try {
    const departmentss = await departments_service.get_departments();
    if (!departmentss) {
      // console.log("No departmentss found.");
      res.json({
        success: false,
        message: "No departmentss found.",
      });
    } else {
      // console.log("departmentss found: ", departmentss);
      res.status(200).json({ success: true, data: departmentss });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    console.log("Error fetching departmentss.");

    res.json({
      success: false,
      message: err.message || "Fetching departmentss failed.",
    });
  }
};

const create_departments_controller = async (req, res) => {
  try {
    // Optional: Validate request body first
    if (!req.body.department_name) {
      return res.json({
        message: "Departmentname and password are required.",
      });
    }
    // console.log("controller");
    // Check if departments already exists
    const existingDepartment =
      await departments_service.find_department_by_department_name(
        req.body.department_name,
      );

    if (existingDepartment) {
      return res.json({
        success: false,
        message: "Department already exists.",
      });
    }

    const departments = await departments_service.create_department(req.body);

    if (departments.success) {
      res.status(201).json({
        success: true,
        message: "Department created successfully.",
      });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    console.log(err);
    res.json({
      success: false,
      message: err.message || "Department creation failed.",
    });
  }
};

const update_department_controller = async (req, res) => {
  try {
    const department_id = req.params.id;

    // Check if departments exists
    const existingDepartment =
      await departments_service.find_by_id(department_id);

    if (!existingDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    //checking if the department_name is already taken
    if (req.body.department_name) {
      const departmentsWithSameDepartmentname =
        await departments_service.find_department_by_department_name(
          req.body.department_name,
        );

      if (departmentsWithSameDepartmentname) {
        // console.log("Matching departments name: ", departmentsWithSameDepartmentname.department_name);
        // console.log(`${department_id} !== ${departmentsWithSameDepartmentname.id}`);
        // console.log(department_id !== departmentsWithSameDepartmentname.id);
        if (Number(department_id) !== departmentsWithSameDepartmentname.id) {
          return res.json({
            success: false,
            message: "Departmentname already taken.",
          });
        }
      }
      // console.log("No match found.");
    }

    await departments_service.update_department(department_id, req.body);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: "Department updated successfully.",
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || "Department update failed.",
    });
  }
};

const delete_department_controller = async (req, res) => {
  try {
    const department_id = req.params.id;

    // Optional: Validate request body first
    if (!department_id) {
      return res.json({
        message: "department_id is required",
      });
    }
    // Check if departments exists
    const existingDepartment =
      await departments_service.find_by_id(department_id);

    if (!existingDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    const update_department =
      await departments_service.delete_department(department_id);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: "Department deleted successfully.",
      data: update_department,
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || "Department deletion failed.",
    });
  }
};

module.exports = {
  get_departments_controller,
  create_departments_controller,
  update_department_controller,
  delete_department_controller,
};
