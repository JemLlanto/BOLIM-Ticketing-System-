const express = require("express");
const {
  get_all_tickets_controller,
  get_pending_ongoing_tickets_controller,
  get_tickets_by_date_controller,
  create_ticket_controller,
  update_status,
  deletePart,
} = require("../controllers/ticket.controller");

const router = express.Router();

router.get("/fetch-tickets", get_all_tickets_controller);
router.get(
  "/fetch-pending-ongoing-tickets",
  get_pending_ongoing_tickets_controller,
);
router.get("/fetch-tickets-by-date", get_tickets_by_date_controller);

router.post("/create-ticket", create_ticket_controller);
router.put("/update-status", update_status);
router.delete("/delete-part/:id", deletePart);

module.exports = router;
