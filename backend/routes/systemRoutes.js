const router = require("express").Router();

const {
  getDiskInfoController,
  getSystemInfoController,
} = require("../controllers/systemController");

//Get disk info || METHOD GET
router.get("/disk", getDiskInfoController);
//Get system info || METHOD GET
router.get("/os", getSystemInfoController);

module.exports = router;
