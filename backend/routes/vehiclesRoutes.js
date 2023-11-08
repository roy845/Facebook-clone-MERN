const router = require("express").Router();

const {
  createVehicleController,
  searchVehiclesController,
  getVehicleController,
  deleteVehicleController,
  updateVehicleController,
} = require("../controllers/vehiclesController");

//Create vehicle || METHOD POST
router.post("/", createVehicleController);
//Search vehicles || METHOD GET
router.get("/", searchVehiclesController);
//Get vehicle || METHOD GET
router.get("/:vehicleId", getVehicleController);
//Delete vehicle || METHOD DELETE
router.delete("/:vehicleId", deleteVehicleController);
//Update vehicle || METHOD PUT
router.put("/:vehicleId", updateVehicleController);

module.exports = router;
