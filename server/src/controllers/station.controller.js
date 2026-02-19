const stations_service = require("../services/station.service");

const get_stations_controller = async (req, res, next) => {
  try {
    const stations = await stations_service.get_stations();
    if (!stations) {
      // console.log("No stations found.");
      res.json({
        success: false,
        message: "No stations found.",
      });
    } else {
      // console.log("stations found: ", stations);
      res.status(200).json({ success: true, data: stations });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    console.log("Error fetching stations.");

    res.json({
      success: false,
      message: err.message || "Fetching stations failed.",
    });
  }
};

const create_stations_controller = async (req, res) => {
  try {
    // Optional: Validate request body first
    if (!req.body.station_name) {
      return res.json({
        message: "station name and password are required.",
      });
    }
    // console.log("controller");
    // Check if stations already exists
    const existingStation = await stations_service.find_station_by_station_name(
      req.body.station_name,
    );

    if (existingStation) {
      return res.json({
        success: false,
        message: "Station already exists.",
      });
    }

    const stations = await stations_service.create_station(req.body);

    if (stations.success) {
      res.status(201).json({
        success: true,
        message: "Station created successfully.",
      });
    }
  } catch (err) {
    // You can add specific error handling here if needed
    console.log(err);
    res.json({
      success: false,
      message: err.message || "Station creation failed.",
    });
  }
};

const update_station_controller = async (req, res) => {
  try {
    const station_id = req.params.id;

    // Check if stations exists
    const existingStation = await stations_service.find_by_id(station_id);

    if (!existingStation) {
      return res.status(404).json({
        success: false,
        message: "Station not found.",
      });
    }

    //checking if the station_name is already taken
    if (req.body.station_name) {
      const stations_with_same_station_name =
        await stations_service.find_station_by_station_name(
          req.body.station_name,
        );

      if (stations_with_same_station_name) {
        // console.log("Matching stations name: ", stations_with_same_station_name.station_name);
        // console.log(`${station_id} !== ${stations_with_same_station_name.id}`);
        // console.log(station_id !== stations_with_same_station_name.id);
        if (Number(station_id) !== stations_with_same_station_name.id) {
          return res.json({
            success: false,
            message: "station name already taken.",
          });
        }
      }
      // console.log("No match found.");
    }

    await stations_service.update_station(station_id, req.body);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: "Station updated successfully.",
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || "Station update failed.",
    });
  }
};

const delete_station_controller = async (req, res) => {
  try {
    const station_id = req.params.id;

    // Optional: Validate request body first
    if (!station_id) {
      return res.json({
        message: "station_id is required",
      });
    }
    // Check if stations exists
    const existingStation = await stations_service.find_by_id(station_id);

    if (!existingStation) {
      return res.status(404).json({
        success: false,
        message: "Station not found.",
      });
    }

    const update_station = await stations_service.delete_station(station_id);

    // Return consistent response structure
    res.status(200).json({
      success: true,
      message: "Station deleted successfully.",
      data: update_station,
    });
  } catch (err) {
    // You can add specific error handling here if needed
    res.json({
      success: false,
      message: err.message || "Station deletion failed.",
    });
  }
};

module.exports = {
  get_stations_controller,
  create_stations_controller,
  update_station_controller,
  delete_station_controller,
};
