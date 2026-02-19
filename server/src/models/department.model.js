const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Department = sequelize.define("Department", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  department_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = Department;
