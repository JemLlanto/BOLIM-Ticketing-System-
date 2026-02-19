const reasons_service = require("../services/reason.service");

const get_reasons_controller = async (req, res, next) => {
  try {
    const reasons = await reasons_service.get_reasons();
    if (!reasons) {
      // console.log("No reasons found.");
      res.json({
        success: false,
        message: "No reasons found.",
      });
    } else {
      // console.log("reasons found: ", reasons);
      res.status(200).json({ success: true, data: reasons });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    console.log("Error fetching reasons.");

    res.json({
      success: false,
      message: err.message || "Fetching reasons failed.",
    });
  }
};

const create_reasons_controller = async (req, res) => {
  try {
    // Optional: Validate request body first
    if (!req.body.reason_name) {
      return res.json({
        message: "reason name and password are required.",
      });
    }
    // console.log("controller");
    // Check if reasons already exists
    const existingReason = await reasons_service.find_reason_by_reason_name(
      req.body.reason_name,
    );

    if (existingReason) {
      return res.json({
        success: false,
        message: "Reason already exists.",
      });
    }

    const reasons = await reasons_service.create_reason(req.body);

    if (reasons.success) {
      res.status(201).json({
        success: true,
        message: "Reason created successfully.",
      });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    console.log(err);
    res.json({
      success: false,
      message: err.message || "Reason creation failed.",
    });
  }
};

const update_reason_controller = async (req, res) => {
  try {
    const reason_id = req.params.id;

    // Check if reasons exists
    const existingReason = await reasons_service.find_by_id(reason_id);

    if (!existingReason) {
      return res.status(404).json({
        success: false,
        message: "Reason not found.",
      });
    }

    //checking if the reason_name is already taken
    if (req.body.reason_name) {
      const reasons_with_same_reason_name =
        await reasons_service.find_reason_by_reason_name(req.body.reason_name);

      if (reasons_with_same_reason_name) {
        // console.log("Matching reasons name: ", reasons_with_same_reason_name.reason_name);
        // console.log(`${reason_id} !== ${reasons_with_same_reason_name.id}`);
        // console.log(reason_id !== reasons_with_same_reason_name.id);
        if (Number(reason_id) !== reasons_with_same_reason_name.id) {
          return res.json({
            success: false,
            message: "reason name already taken.",
          });
        }
      }
      // console.log("No match found.");
    }

    await reasons_service.update_reason(reason_id, req.body);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: "Reason updated successfully.",
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || "Reason update failed.",
    });
  }
};

const delete_reason_controller = async (req, res) => {
  try {
    const reason_id = req.params.id;

    // Optional: Validate request body first
    if (!reason_id) {
      return res.json({
        message: "reason_id is required",
      });
    }
    // Check if reasons exists
    const existingReason = await reasons_service.find_by_id(reason_id);

    if (!existingReason) {
      return res.status(404).json({
        success: false,
        message: "Reason not found.",
      });
    }

    const update_reason = await reasons_service.delete_reason(reason_id);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: "Reason deleted successfully.",
      data: update_reason,
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || "Reason deletion failed.",
    });
  }
};

module.exports = {
  get_reasons_controller,
  create_reasons_controller,
  update_reason_controller,
  delete_reason_controller,
};
