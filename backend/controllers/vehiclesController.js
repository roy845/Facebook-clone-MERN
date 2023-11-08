const Vehicle = require("../models/Vehicle");

const createVehicleController = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    const savedVehicle = await newVehicle.save();

    res.status(200).json(savedVehicle);
  } catch (err) {
    res.status(500).json(err);
  }
};

const searchVehiclesController = async (req, res) => {
  try {
    const {
      query,
      sort,
      condition,
      type,
      minPrice,
      maxPrice,
      bodyStyle,
      fuelType,
      transmission,
    } = req.query;

    const filterOptions = {};

    if (query) {
      filterOptions.$or = [
        { type: { $regex: query, $options: "i" } },
        { make: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { bodyStyle: { $regex: query, $options: "i" } },
        { condition: { $regex: query, $options: "i" } },
        { transmission: { $regex: query, $options: "i" } },
      ];
    }

    if (minPrice && maxPrice) {
      filterOptions.price = {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      };
    }

    let sortOptions = {};

    if (sort === "Price: Lowest first") {
      sortOptions.price = 1;
    } else if (sort === "Price: Highest first") {
      sortOptions.price = -1;
    } else if (sort === "Date listed: Newest first") {
      sortOptions.createdAt = -1;
    } else if (sort === "Date listed: Oldest first") {
      sortOptions.createdAt = 1;
    } else if (sort === "Mileage:Lowest first") {
      sortOptions.mileage = 1;
    } else if (sort === "Mileage:Highest first") {
      sortOptions.createdAt = -1;
    } else if (sort === "Year:Oldest first") {
      sortOptions.year = 1;
    } else if (sort === "Year:Newest first") {
      sortOptions.year = -1;
    }

    if (type) {
      filterOptions.type = type;
    }
    if (bodyStyle) {
      filterOptions.bodyStyle = bodyStyle;
    }
    if (condition) {
      filterOptions.condition = condition;
    }
    if (fuelType) {
      filterOptions.fuelType = fuelType;
    }
    if (transmission) {
      filterOptions.transmission = transmission;
    }

    const vehicles = await Vehicle.find(filterOptions)
      .populate("seller")
      .sort(sortOptions);

    res.status(200).json(vehicles);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getVehicleController = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = await Vehicle.findById(vehicleId).populate("seller");

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteVehicleController = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const deletedVehicle = await Vehicle.findByIdAndRemove(vehicleId);

    if (deletedVehicle) {
      return res.status(200).json({ message: "Vehicle deleted successfully" });
    } else {
      return res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateVehicleController = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { updatedVehicle } = req.body;

    if (!updatedVehicle || Object.keys(updatedVehicle).length === 0) {
      return res
        .status(400)
        .json({ error: "Updated vehicle data is missing or empty." });
    }

    const updateVehicle = await Vehicle.findOneAndUpdate(
      { _id: vehicleId },
      updatedVehicle,
      { new: true }
    );

    if (!updateVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json(updateVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createVehicleController,
  searchVehiclesController,
  getVehicleController,
  deleteVehicleController,
  updateVehicleController,
};
