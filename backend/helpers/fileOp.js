const jsonfile = require("jsonfile");

const readJsonFile = async (filePath) => {
  try {
    const data = await jsonfile.readFile(filePath);
    return data;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

const writeJsonFile = async (filePath, data) => {
  try {
    await jsonfile.writeFile(filePath, data, { spaces: 2 });
    console.log("Data written successfully!");
  } catch (err) {
    console.error("Error writing file:", err);
    throw err;
  }
};

module.exports = { readJsonFile, writeJsonFile };
