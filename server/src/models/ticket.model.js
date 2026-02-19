const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Ticket = sequelize.define("Ticket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  user: {
    type: DataTypes.STRING(100),
  },
  department: {
    type: DataTypes.STRING(100),
  },
  station: {
    type: DataTypes.STRING(100),
  },
  reason: {
    type: DataTypes.STRING(100),
  },
  description: {
    type: DataTypes.STRING(999),
  },
  status: {
    type: DataTypes.STRING(100),
  },
  remarks: {
    type: DataTypes.STRING(999),
  },
  it_personel: {
    type: DataTypes.STRING(100),
  },
});

module.exports = Ticket;
