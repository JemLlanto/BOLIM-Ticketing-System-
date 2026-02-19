const Reason = require("../models/reason.model");

const get_reasons = async () => {
  return await Reason.findAll({
    order: [["reason_name", "ASC"]],
  });
};

const find_by_id = async (id) => {
  try {
    const reasons = await Reason.findOne({
      where: { id: id },
      raw: true,
    });
    // console.log("Reason ID confirm: ", reasons);
    return reasons;
  } catch (error) {
    console.log("Error Finding Reason: ", error);
    throw error;
  }
};

const find = async (reason_name) => {
  try {
    const reasons = await Reason.findOne({
      where: { reason_name: reason_name },
      raw: true,
    });
    // console.log("Checking reasons existense... ", reasons ? `Found` : "Cannot Found");
    return reasons;
  } catch (error) {
    console.log("Error Finding Reason: ", error);
    throw error;
  }
};

const find_reason_by_reason_name = async (reason_name) => {
  try {
    const reasons = await Reason.findOne({
      where: { reason_name: reason_name },
    });
    // console.log("Checking reasonsname: ", reason_name, reasons);
    return reasons;
  } catch (error) {
    throw error;
  }
};

const create_reason = async (reason_data) => {
  try {
    const { reason_name } = reason_data;

    // console.log("Adding reasons.");
    await Reason.create({
      reason_name: reason_name,
    });

    // Return reasons without password
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

const update_reason = async (reason_id, reason_data) => {
  try {
    const reasons = await Reason.findByPk(reason_id);

    if (!reasons) {
      throw new Error("Reason not found.");
    }

    // prepare the data
    const updateData = {
      is_admin: reason_data.is_admin,
    };

    if (reason_data.reason_name) {
      updateData.reason_name = reason_data.reason_name;
    }

    await reasons.update(updateData);

    // console.log("Reason updated successfully: ", updateData);

    // Return reasons without password
    return {
      id: reasons.id,
      reason_name: reasons.reason_name,
    };
  } catch (error) {
    console.error("Error updating reasons: ", error);
    throw error;
  }
};

const delete_reason = async (reason_id) => {
  try {
    const reasons = await Reason.findByPk(reason_id);

    if (!reasons) {
      throw new Error("Reason not found.");
    }

    // IF USER IS FOUND DELETE
    await reasons.destroy(reason_id);

    // console.log("Reason deleted successfully.");

    // Return reasons without password
    return {
      id: reasons.id,
      reason_name: reasons.reason_name,
    };
  } catch (error) {
    console.error("Error updating reasons: ", error);
    throw error;
  }
};

module.exports = {
  find_reason_by_reason_name,
  get_reasons,
  create_reason,
  update_reason,
  delete_reason,
  find,
  find_by_id,
};
