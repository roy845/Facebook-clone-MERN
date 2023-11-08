const disk = require("node-disk-info");
const os = require("os");

const getDiskInfoController = async (req, res) => {
  try {
    const disks = disk.getDiskInfoSync();
    res.json(disks);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching disk info",
      error: error.message,
    });
  }
};

const getSystemInfoController = async (req, res) => {
  try {
    // Get the platform (e.g. 'darwin' for macOS, 'win32' for Windows)
    const platform = os.platform();
    // Get the CPU architecture (e.g. 'x64')
    const arch = os.arch();
    // Get the hostname of the device
    const hostname = os.hostname();
    // Get the total system memory in bytes
    const totalMemory = os.totalmem();
    // Get the amount of free system memory in bytes
    const freeMemory = os.freemem();

    res.json({
      platform: platform,
      arch: arch,
      hostname: hostname,
      freeMemory: freeMemory,
      totalMemory: totalMemory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching system info", error: error.message });
  }
};

module.exports = {
  getDiskInfoController,
  getSystemInfoController,
};
