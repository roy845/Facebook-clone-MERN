const Property = require("../models/Property");

const createPropertyController = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();

    res.status(200).json(savedProperty);
  } catch (err) {
    res.status(500).json(err);
  }
};

const searchPropertiesController = async (req, res) => {
  try {
    const {
      query,
      sort,
      type,
      bedrooms,
      bathrooms,
      washingMachine,
      parkingType,
      airConditioning,
      heatingType,
      catFriendly,
      dogFriendly,
      squareFeetMin,
      squareFeetMax,
      minPrice,
      maxPrice,
    } = req.query;

    const filterOptions = {};

    if (query) {
      filterOptions.$or = [
        { type: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { washingMachine: { $regex: query, $options: "i" } },
        { parkingType: { $regex: query, $options: "i" } },
        { airConditioning: { $regex: query, $options: "i" } },
        { heatingType: { $regex: query, $options: "i" } },
      ];
    }

    if (minPrice && maxPrice) {
      filterOptions.pricePerMonth = {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      };
    }

    if (squareFeetMin && squareFeetMax) {
      filterOptions.propertySquareFeet = {
        $gte: parseInt(squareFeetMin),
        $lte: parseInt(squareFeetMax),
      };
    }

    if (type) {
      filterOptions.type = type;
    }

    if (bedrooms) {
      const parsedBedrooms = parseInt(bedrooms);
      if (!isNaN(parsedBedrooms)) {
        if (bedrooms === "All") {
          filterOptions.bedrooms = {};
        } else {
          filterOptions.bedrooms = { $gte: parsedBedrooms };
        }
      }
    }

    if (bathrooms) {
      const parsedBathrooms = parseInt(bathrooms);
      if (!isNaN(parsedBathrooms)) {
        if (bathrooms === "All") {
          filterOptions.bathrooms = {};
        } else {
          filterOptions.bathrooms = { $gte: parsedBathrooms };
        }
      }
    }

    if (washingMachine) {
      filterOptions.washingMachine = washingMachine;
    }

    if (parkingType) {
      filterOptions.parkingType = parkingType;
    }

    if (airConditioning) {
      filterOptions.airConditioning = airConditioning;
    }

    if (heatingType) {
      filterOptions.heatingType = heatingType;
    }

    if (catFriendly) {
      filterOptions.catFriendly = catFriendly === "Yes";
    }

    if (dogFriendly) {
      filterOptions.dogFriendly = dogFriendly === "Yes";
    }

    const sortOptions = {};

    if (sort === "Price: Lowest first") {
      sortOptions.pricePerMonth = 1;
    } else if (sort === "Price: Highest first") {
      sortOptions.pricePerMonth = -1;
    } else if (sort === "Date listed: Newest first") {
      sortOptions.createdAt = -1;
    } else if (sort === "Date listed: Oldest first") {
      sortOptions.createdAt = 1;
    }

    const properties = await Property.find(filterOptions)
      .populate("seller")
      .sort(sortOptions);

    res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getPropertyController = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const vehicle = await Property.findById(propertyId).populate("seller");

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePropertyController = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const deletedProperty = await Property.findByIdAndRemove(propertyId);

    if (deletedProperty) {
      return res.status(200).json({ message: "Property deleted successfully" });
    } else {
      return res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePropertyController = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { updatedProperty } = req.body;
    console.log(propertyId);

    if (!updatedProperty || Object.keys(updatedProperty).length === 0) {
      return res
        .status(400)
        .json({ error: "Updated property data is missing or empty." });
    }

    const updateProperty = await Property.findOneAndUpdate(
      { _id: propertyId },
      updatedProperty,
      { new: true }
    );

    if (!updateProperty) {
      console.log("hi");
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(updateProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createPropertyController,
  searchPropertiesController,
  getPropertyController,
  deletePropertyController,
  updatePropertyController,
};
