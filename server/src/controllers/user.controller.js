const user_service = require("../services/user.service");

const get_all_users_controller = async (req, res, next) => {
  try {
    const users = await user_service.get_all_users();
    if (!users) {
      // console.log("No users found.");
      res.json({
        success: false,
        message: "No users found.",
      });
    } else {
      // console.log("users found: ", users);
      res.status(200).json({ success: true, data: users });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    console.log("Error fetching users.");

    res.json({
      success: false,
      message: err.message || "Fetching users failed.",
    });
  }
};

const create_user_controller = async (req, res) => {
  try {
    // Optional: Validate request body first
    if (!req.body.user_name || !req.body.password) {
      return res.json({
        message: "Username and password are required.",
      });
    }
    // console.log("controller");
    // Check if user already exists
    const existingUser = await user_service.find_user_by_username(
      req.body.user_name,
    );

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    const user = await user_service.create_user(req.body);

    if (user.success) {
      res.status(201).json({
        success: true,
        message: "User created successfully.",
      });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    console.log(err);
    res.json({
      success: false,
      message: err.message || "User creation failed.",
    });
  }
};

const update_user_controller = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const existingUser = await user_service.find_by_id(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    //checking if the user_name is already taken
    if (req.body.user_name) {
      const userWithSameUsername = await user_service.find_user_by_username(
        req.body.user_name,
      );

      if (userWithSameUsername) {
        // console.log("Matching user name: ", userWithSameUsername.user_name);
        // console.log(`${userId} !== ${userWithSameUsername.id}`);
        // console.log(userId !== userWithSameUsername.id);
        if (Number(userId) !== userWithSameUsername.id) {
          return res.json({
            success: false,
            message: "Username already taken.",
          });
        }
      }
      // console.log("No match found.");
    }

    await user_service.update_user(userId, req.body);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || "User update failed.",
    });
  }
};

const delete_user_controller = async (req, res) => {
  try {
    const userId = req.params.id;

    // Optional: Validate request body first
    if (!userId) {
      return res.json({
        message: "userId is required",
      });
    }
    // Check if user exists
    const existingUser = await user_service.find_by_id(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const update_user = await user_service.delete_user(userId);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: update_user,
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || "User deletion failed.",
    });
  }
};

module.exports = {
  get_all_users_controller,
  create_user_controller,
  update_user_controller,
  delete_user_controller,
};
