const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    subcategory: {
      type: String,
      default: "",
      required: true,
    },
    category: {
      type: String,
      default: "",
      required: true,
    },
    condition: {
      type: String,
      default: "",
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    availability: {
      type: String,
      default: "",
      required: true,
    },
    productTags: {
      type: String,
      default: "",
      required: true,
    },
    location: {
      type: String,
      default: "",
      required: true,
    },
    files: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
