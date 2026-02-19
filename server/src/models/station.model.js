const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Station = sequelize.define("Station", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  station_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = Station;
