const express = require("express");
const { getFileController } = require("../controllers/filesController");

const router = express.Router();

//getFile || METHOD GET
router.get("/:filename", getFileController);

module.exports = router;
