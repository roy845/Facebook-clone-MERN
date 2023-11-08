const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      default: "",
      required: true,
    },
    year: {
      type: Number,
      default: "",
      required: true,
    },
    make: {
      type: String,
      default: "",
      required: true,
    },
    model: {
      type: String,
      default: "",
      required: true,
    },
    mileage: {
      type: Number,
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
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    bodyStyle: {
      type: String,
      required: true,
      default: "",
    },
    condition: {
      type: String,
      required: true,
      default: "",
    },
    fuelType: {
      type: String,
      required: true,
      default: "",
    },
    transmission: {
      type: String,
      required: true,
      default: "",
    },
    cleanTitle: {
      type: Boolean,
      required: true,
      default: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
