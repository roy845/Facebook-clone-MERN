const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
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
    bedrooms: {
      type: Number,
      default: "",
      required: true,
    },
    bathrooms: {
      type: Number,
      default: "",
      required: true,
    },
    pricePerMonth: {
      type: Number,
      default: "",
      required: true,
    },
    address: {
      type: String,
      default: "",
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    dateAvailable: {
      type: Date,
      default: Date.now,
      required: true,
    },
    propertySquareFeet: {
      type: Number,
      default: "",
      required: true,
    },
    files: {
      type: Array,
      default: [],
    },
    washingMachine: {
      type: String,
      required: true,
      default: 0,
    },
    parkingType: {
      type: String,
      required: true,
      default: "",
    },
    airConditioning: {
      type: String,
      required: true,
      default: "",
    },
    heatingType: {
      type: String,
      required: true,
      default: "",
    },
    catFriendly: {
      type: Boolean,
      required: true,
      default: "",
    },
    dogFriendly: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
