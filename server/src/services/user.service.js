const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const get_all_users = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
    order: [["user_name", "ASC"]],
  });
};

const find_by_id = async (id) => {
  try {
    const user = await User.findOne({
      where: { id: id },
      raw: true,
    });
    // console.log("User ID confirm: ", user);
    return user;
  } catch (error) {
    console.log("Error Finding User: ", error);
    throw error;
  }
};

const find = async (user_name) => {
  try {
    const user = await User.findOne({
      where: { user_name: user_name },
      raw: true,
    });
    // console.log("Checking user existense... ", user ? `Found` : "Cannot Found");
    return user;
  } catch (error) {
    console.log("Error Finding User: ", error);
    throw error;
  }
};

const find_user_by_username = async (user_name) => {
  try {
    const user = await User.findOne({
      where: { user_name: user_name },
    });
    // console.log("Checking username: ", user_name, user);
    return user;
  } catch (error) {
    throw error;
  }
};

const create_user = async (userData) => {
  try {
    const { user_name, password } = userData;

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("Adding user.");
    const user = await User.create({
      user_name: user_name,
      password: hashedPassword,
    });

    // Return user without password
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

const update_user = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    // prepare the data
    const updateData = {
      is_admin: userData.is_admin,
    };

    if (userData.user_name) {
      updateData.user_name = userData.user_name;
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      updateData.password = hashedPassword;
    }

    await user.update(updateData);

    // console.log("User updated successfully: ", updateData);

    // Return user without password
    return {
      id: user.id,
      user_name: user.user_name,
    };
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
};

const delete_user = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    // IF USER IS FOUND DELETE
    await user.destroy(userId);

    // console.log("User deleted successfully.");

    // Return user without password
    return {
      id: user.id,
      user_name: user.user_name,
    };
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
};

module.exports = {
  find_user_by_username,
  get_all_users,
  create_user,
  update_user,
  delete_user,
  find,
  find_by_id,
};
