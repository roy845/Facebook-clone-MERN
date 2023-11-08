const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    post: {
      type: Object,
      default: {},
    },
    recipientId: {
      type: String,
      trim: true,
    },
    sender: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
