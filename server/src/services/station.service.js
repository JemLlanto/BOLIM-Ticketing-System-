const Station = require("../models/station.model");

const get_stations = async () => {
  return await Station.findAll({
    order: [["station_name", "ASC"]],
  });
};

const find_by_id = async (id) => {
  try {
    const stations = await Station.findOne({
      where: { id: id },
      raw: true,
    });
    // console.log("Station ID confirm: ", stations);
    return stations;
  } catch (error) {
    console.log("Error Finding Station: ", error);
    throw error;
  }
};

const find = async (station_name) => {
  try {
    const stations = await Station.findOne({
      where: { station_name: station_name },
      raw: true,
    });
    // console.log("Checking stations existense... ", stations ? `Found` : "Cannot Found");
    return stations;
  } catch (error) {
    console.log("Error Finding Station: ", error);
    throw error;
  }
};

const find_station_by_station_name = async (station_name) => {
  try {
    const stations = await Station.findOne({
      where: { station_name: station_name },
    });
    // console.log("Checking stationsname: ", station_name, stations);
    return stations;
  } catch (error) {
    throw error;
  }
};

const create_station = async (station_data) => {
  try {
    const { station_name } = station_data;

    // console.log("Adding stations.");
    await Station.create({
      station_name: station_name,
    });

    // Return stations without password
    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

const update_station = async (station_id, station_data) => {
  try {
    const stations = await Station.findByPk(station_id);

    if (!stations) {
      throw new Error("Station not found.");
    }

    // prepare the data
    const updateData = {
      is_admin: station_data.is_admin,
    };

    if (station_data.station_name) {
      updateData.station_name = station_data.station_name;
    }

    await stations.update(updateData);

    // console.log("Station updated successfully: ", updateData);

    // Return stations without password
    return {
      id: stations.id,
      station_name: stations.station_name,
    };
  } catch (error) {
    console.error("Error updating stations: ", error);
    throw error;
  }
};

const delete_station = async (station_id) => {
  try {
    const stations = await Station.findByPk(station_id);

    if (!stations) {
      throw new Error("Station not found.");
    }

    // IF USER IS FOUND DELETE
    await stations.destroy(station_id);

    // console.log("Station deleted successfully.");

    // Return stations without password
    return {
      id: stations.id,
      station_name: stations.station_name,
    };
  } catch (error) {
    console.error("Error updating stations: ", error);
    throw error;
  }
};

module.exports = {
  find_station_by_station_name,
  get_stations,
  create_station,
  update_station,
  delete_station,
  find,
  find_by_id,
};
