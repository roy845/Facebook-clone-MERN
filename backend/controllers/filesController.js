const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Grid = require("gridfs-stream");
require("dotenv").config();

const getFileController = asyncHandler(async (req, res) => {
  const filename = req.params.filename;
  const filePath = `uploads/${filename}`; // Adjust the path based on your storage location

  res.download(filePath, (err) => {
    if (err) {
      console.log(err);
      // Handle any errors that occur during the download
      res.status(404).send("File not found.");
    }
  });
});

module.exports = {
  getFileController,
};
