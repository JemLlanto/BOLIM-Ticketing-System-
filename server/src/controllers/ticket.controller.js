const ticket_service = require("../services/ticket.service");
const fs = require("fs");
const path = require("path");

const get_all_tickets_controller = async (req, res) => {
  try {
    const tickets = await ticket_service.get_all_tickets();
    if (!tickets) {
      // console.log("No tickets found.");
      res.json({
        success: false,
        message: "No tickets found.",
      });
    } else {
      // console.log("Parts found: ", tickets);
      res.status(200).json({ success: true, data: tickets });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    // console.log("Error fetching tickets.");

    res.json({
      success: false,
      message: err.message || "Fetching tickets failed.",
    });
  }
};

const get_pending_ongoing_tickets_controller = async (req, res) => {
  try {
    const { user_id } = req.query;
    // console.log("user_id: ", user_id);

    const tickets = await ticket_service.get_pending_ongoing_tickets(user_id);
    if (!tickets) {
      // console.log("No tickets found.");
      res.json({
        success: false,
        message: "No tickets found.",
      });
    } else {
      // console.log("Parts found: ", tickets);
      res.status(200).json({ success: true, data: tickets });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    // console.log("Error fetching tickets.");

    res.json({
      success: false,
      message: err.message || "Fetching tickets failed.",
    });
  }
};

const get_tickets_by_date_controller = async (req, res) => {
  try {
    if (!req.query.start_date || !req.query.end_date) {
      return res(500).json({
        success: false,
        message: "Incomplete date range.",
      });
    }
    const { user_id } = req.query;
    // console.log(req.query);

    const tickets = await ticket_service.get_tickets_by_date(
      req.query.start_date,
      req.query.end_date,
      user_id,
    );
    if (!tickets) {
      // console.log("No tickets found.");
      res.json({
        success: false,
        message: "No tickets found.",
      });
    } else {
      // console.log("Parts found: ", tickets);
      res.status(200).json({ success: true, data: tickets });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    // console.log("Error fetching tickets.");

    res.json({
      success: false,
      message: err.message || "Fetching tickets failed.",
    });
  }
};

const create_ticket_controller = async (req, res) => {
  try {
    // Optional: Validate request body first
    if (
      !req.body.user_id ||
      !req.body.user ||
      !req.body.department ||
      !req.body.station ||
      !req.body.reason ||
      !req.body.description ||
      !req.body.status
    ) {
      console.log(req.body);
      return res.json({
        message: "Please fill in all required fields.",
      });
    }

    const user = await ticket_service.create_ticket(req.body);
    if (user.success) {
      // Return consistent response structure
      res.status(201).json({
        success: true,
        message: `New ticket created successfully.`,
      });
    } else {
      // Return consistent response structure
      res.status(500).json({
        success: false,
        message: `Unexpected error occur while adding new ticket.`,
      });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || `ticket creation failed`,
    });
  }
};

const update_status = async (req, res) => {
  try {
    // console.log("=== DEBUG INFO ===");
    // console.log("Headers:", req.headers);
    // console.log("Body:", req.body);
    // console.log("File:", req.file);
    // console.log("Files:", req.files); // In case it's an array
    // console.log("==================");
    // const ticket_id = req.params.id;

    if (
      !req.body.id ||
      !req.body.new_status ||
      !req.body.remarks ||
      !req.body.it_personel
    ) {
      return res.json({
        message: "Please fill in all required fields.",
      });
    }

    const data = {
      id: req.body.id,
      remarks: req.body.remarks,
      new_status: req.body.new_status,
      it_personel: req.body.it_personel,
    };

    // Check if part exists
    const existingPart = await ticket_service.find_by_id(req.body.id);

    // console.log("Existing match: ", existingPart);
    if (!existingPart) {
      return res.json({
        success: false,
        message: `Ticket not found.`,
      });
    }

    await ticket_service.update_ticket(data);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: `Ticket updated successfully.`,
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || `Ticket update failed.`,
    });
  }
};

const deletePart = async (req, res) => {
  try {
    const ticket_id = req.params.id;

    // Optional: Validate request body first
    if (!ticket_id) {
      return res.json({
        message: "ticket_id is required",
      });
    }
    // Check if user exists
    const existingPart = await ticket_service.find_by_id(ticket_id);

    if (!existingPart) {
      return res.json({
        success: false,
        message: "Part not found.",
      });
    }

    if (existingPart.image) {
      // Delete old image if it exists
      if (existingPart.image) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads/pinImage",
          existingPart.image,
        );

        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Failed to delete old image:", err);
          } else {
            // console.log("Old image deleted:", existingPart.image);
          }
        });
      }
    }

    const deletePart = await ticket_service.deletePart(ticket_id);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: "Part removed successfully!",
      data: deletePart,
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || "Part deletion failed",
    });
  }
};

module.exports = {
  get_all_tickets_controller,
  get_pending_ongoing_tickets_controller,
  get_tickets_by_date_controller,
  create_ticket_controller,
  update_status,
  deletePart,
};
