const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Reason = sequelize.define("Reason", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reason_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = Reason;
