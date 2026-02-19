const express = require("express");
const {
  get_all_users_controller,
  create_user_controller,
  update_user_controller,
  delete_user_controller,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/fetch-users", get_all_users_controller);
router.post("/create-user", create_user_controller);
router.put("/update-user/:id", update_user_controller);
router.delete("/delete-user/:id", delete_user_controller);

module.exports = router;
