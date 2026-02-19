const express = require("express");
const {
  get_stations_controller,
  create_stations_controller,
  update_station_controller,
  delete_station_controller,
} = require("../controllers/station.controller");

const router = express.Router();

router.get("/fetch-stations", get_stations_controller);
router.post("/create-station", create_stations_controller);
router.put("/update-station/:id", update_station_controller);
router.delete("/delete-station/:id", delete_station_controller);

module.exports = router;
