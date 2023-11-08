const Item = require("../models/Item");

const createItemController = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();

    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

const searchItemsController = async (req, res) => {
  try {
    const { query, sort, condition, category, minPrice, maxPrice } = req.query;
    const filterOptions = {};

    if (query) {
      filterOptions.$or = [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { subcategory: { $regex: query, $options: "i" } },
        { condition: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ];
    }

    const sortOptions = {};

    if (sort === "Price: Lowest first") {
      sortOptions.price = 1;
    } else if (sort === "Price: Highest first") {
      sortOptions.price = -1;
    } else if (sort === "Date listed: Newest first") {
      sortOptions.createdAt = -1;
    } else if (sort === "Date listed: Oldest first") {
      sortOptions.createdAt = 1;
    }

    if (condition) {
      filterOptions.condition = condition;
    }
    if (category) {
      filterOptions.category = category;
    }

    if (minPrice && maxPrice) {
      filterOptions.price = {
        $gte: parseInt(minPrice),
        $lte: parseInt(maxPrice),
      };
    }

    const items = await Item.find(filterOptions)
      .populate("seller")
      .sort(sortOptions);

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getItemController = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId).populate("seller");

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.params;

    const deletedItem = await Item.findByIdAndRemove(itemId);

    if (deletedItem) {
      return res.status(200).json({ message: "Item deleted successfully" });
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateItemController = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { updatedItem } = req.body;
    console.log(updatedItem);

    if (!updatedItem || Object.keys(updatedItem).length === 0) {
      return res
        .status(400)
        .json({ error: "Updated item data is missing or empty." });
    }

    const updateItem = await Item.findOneAndUpdate(
      { _id: itemId },
      updatedItem,
      { new: true }
    );

    if (!updateItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createItemController,
  searchItemsController,
  getItemController,
  deleteItemController,
  updateItemController,
};
