const router = require("express").Router();

const {
  createPropertyController,
  searchPropertiesController,
  getPropertyController,
  deletePropertyController,
  updatePropertyController,
} = require("../controllers/propertyController");

//Create property || METHOD POST
router.post("/", createPropertyController);
//Searcg properties || METHOD GET
router.get("/", searchPropertiesController);
//Get property || METHOD GET
router.get("/:propertyId", getPropertyController);
//Delete property || METHOD DELETE
router.delete("/:propertyId", deletePropertyController);
//Update property || METHOD PUT
router.put("/:propertyId", updatePropertyController);

module.exports = router;
