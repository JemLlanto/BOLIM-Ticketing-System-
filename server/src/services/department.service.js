const Department = require("../models/department.model");
const bcrypt = require("bcrypt");

const get_departments = async () => {
  return await Department.findAll({
    order: [["department_name", "ASC"]],
  });
};

const find_by_id = async (id) => {
  try {
    const departments = await Department.findOne({
      where: { id: id },
      raw: true,
    });
    // console.log("Department ID confirm: ", departments);
    return departments;
  } catch (error) {
    console.log("Error Finding Department: ", error);
    throw error;
  }
};

const find = async (department_name) => {
  try {
    const departments = await Department.findOne({
      where: { department_name: department_name },
      raw: true,
    });
    // console.log("Checking departments existense... ", departments ? `Found` : "Cannot Found");
    return departments;
  } catch (error) {
    console.log("Error Finding Department: ", error);
    throw error;
  }
};

const find_department_by_department_name = async (department_name) => {
  try {
    const departments = await Department.findOne({
      where: { department_name: department_name },
    });
    // console.log("Checking departmentsname: ", department_name, departments);
    return departments;
  } catch (error) {
    throw error;
  }
};

const create_department = async (department_data) => {
  try {
    const { department_name } = department_data;

    // console.log("Adding departments.");
    await Department.create({
      department_name: department_name,
    });

    // Return departments without password
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

const update_department = async (department_id, department_data) => {
  try {
    const departments = await Department.findByPk(department_id);

    if (!departments) {
      throw new Error("Department not found.");
    }

    // prepare the data
    const updateData = {
      is_admin: department_data.is_admin,
    };

    if (department_data.department_name) {
      updateData.department_name = department_data.department_name;
    }

    if (department_data.password) {
      const hashedPassword = await bcrypt.hash(department_data.password, 10);
      updateData.password = hashedPassword;
    }

    await departments.update(updateData);

    // console.log("Department updated successfully: ", updateData);

    // Return departments without password
    return {
      id: departments.id,
      department_name: departments.department_name,
    };
  } catch (error) {
    console.error("Error updating departments: ", error);
    throw error;
  }
};

const delete_department = async (department_id) => {
  try {
    const departments = await Department.findByPk(department_id);

    if (!departments) {
      throw new Error("Department not found.");
    }

    // IF USER IS FOUND DELETE
    await departments.destroy(department_id);

    // console.log("Department deleted successfully.");

    // Return departments without password
    return {
      id: departments.id,
      department_name: departments.department_name,
    };
  } catch (error) {
    console.error("Error updating departments: ", error);
    throw error;
  }
};

module.exports = {
  find_department_by_department_name,
  get_departments,
  create_department,
  update_department,
  delete_department,
  find,
  find_by_id,
};
