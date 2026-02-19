const Ticket = require("../models/ticket.model");
const sequelize = require("../database");
const { Op } = require("sequelize");

const get_all_tickets = async () => {
  return await Ticket.findAll({
    order: [[`createdAt`, `ASC`]],
  });
};

const get_pending_ongoing_tickets = async (user_id) => {
  const whereClause = {
    status: {
      [Op.in]: ["pending", "ongoing"],
    },
  };
  // console.log("user_id: ", user_id);

  if (user_id) {
    whereClause.user_id = user_id;
  }

  return await Ticket.findAll({
    where: whereClause,
    order: [[`createdAt`, `ASC`]],
  });
};

const get_tickets_by_date = async (start_date, end_date, user_id) => {
  const whereClause = {
    status: {
      [Op.in]: ["resolved", "unresolved"],
    },
    createdAt: {
      [Op.between]: [start_date, end_date],
    },
  };
  // console.log("user_id: ", user_id);

  if (user_id) {
    whereClause.user_id = user_id;
  }

  return await Ticket.findAll({
    where: whereClause,
    order: [[`createdAt`, `ASC`]],
  });
};

const get_tickets_by_user_id = async (user_id) => {
  return await Ticket.findAll({
    where: {
      user_id: user_id,
    },
    order: [[`createdAt`, `ASC`]],
  });
};

const find_by_id = async (id) => {
  try {
    const tickets = await Ticket.findOne({
      where: { id: id },
    });
    // console.log("Ticket ID confirm: ", tickets);
    return tickets;
  } catch (error) {
    console.log("Error Finding Ticket: ", error);
    throw error;
  }
};

const find = async (name) => {
  try {
    const tickets = await Ticket.findOne({
      where: { name: name },
      raw: true,
    });
    console.log(
      "Checking tickets existense... ",
      tickets ? `Found` : "Cannot Found",
    );
    return tickets;
  } catch (error) {
    console.log("Error Finding Ticket: ", error);
    throw error;
  }
};

const findPartByPartNumber = async (partNumber) => {
  try {
    const tickets = await Ticket.findOne({
      where: { partNumber: partNumber },
    });
    // console.log("Checking tickets item name: ", partNumber, tickets);
    return tickets;
  } catch (error) {
    throw error;
  }
};

const findPartByPartname = async (name) => {
  try {
    const tickets = await Ticket.findOne({
      where: sequelize.where(
        sequelize.fn(
          "JSON_CONTAINS",
          sequelize.col("availableItems"),
          JSON.stringify(name),
        ),
        1,
      ),
    });
    // console.log("Checking name: ", name);
    return tickets;
  } catch (error) {
    throw error;
  }
};

const create_ticket = async (update_data) => {
  try {
    const {
      user_id,
      user,
      department,
      station,
      reason,
      other_reason,
      description,
      status,
    } = update_data;

    // Hash password before storing

    // console.log("Adding tickets.");
    await Ticket.create({
      user_id: user_id,
      user: user,
      department: department,
      station: station,
      reason: other_reason ? `${reason}: ${other_reason}` : reason,
      description: description,
      status: status,
    });

    // Return tickets without password
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

const update_ticket = async (update_data) => {
  try {
    const tickets = await Ticket.findByPk(update_data.id);

    if (!tickets) {
      throw new Error("Ticket not found.");
    }

    // prepare the data
    const updateData = {};

    if (update_data.new_status) {
      updateData.status = update_data.new_status;
    }
    if (update_data.remarks) {
      updateData.remarks = update_data.remarks;
    }
    if (update_data.it_personel) {
      updateData.it_personel = update_data.it_personel;
    }

    await tickets.update(updateData);

    // console.log("update data: ", updateData);

    // console.log("Ticket updated successfully.");

    // Return tickets without password
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating tickets: ", error);
    throw error;
  }
};

const deletePart = async (partsId) => {
  try {
    const tickets = await Ticket.findByPk(partsId);

    if (!tickets) {
      throw new Error("Ticket not found.");
    }

    // DELETING INBOUNDS AND OUTBOUNDS FOR THIS PART
    await Inbound.destroy({
      where: { partId: partsId },
    });
    await Outbound.destroy({
      where: { partId: partsId },
    });

    // IF USER IS PART DELETE
    await tickets.destroy(partsId);

    // console.log("Ticket deleted successfully.");

    // Return tickets without password
    return {
      id: tickets.id,
      name: tickets.name,
    };
  } catch (error) {
    console.error("Error updating tickets: ", error);
    throw error;
  }
};

module.exports = {
  findPartByPartname,
  findPartByPartNumber,
  get_all_tickets,
  get_pending_ongoing_tickets,
  get_tickets_by_date,
  get_tickets_by_user_id,
  create_ticket,
  update_ticket,
  deletePart,
  find,
  find_by_id,
};
