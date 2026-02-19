const express = require("express");
const {
  get_reasons_controller,
  create_reasons_controller,
  update_reason_controller,
  delete_reason_controller,
} = require("../controllers/reason.controller");

const router = express.Router();

router.get("/fetch-reasons", get_reasons_controller);
router.post("/create-reason", create_reasons_controller);
router.put("/update-reason/:id", update_reason_controller);
router.delete("/delete-reason/:id", delete_reason_controller);

module.exports = router;
