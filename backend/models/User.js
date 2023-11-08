const mongoose = require("mongoose");

const timeSpentInApp = new mongoose.Schema({
  date: { type: String, required: true, default: "" },
  timeSpent: {
    type: Number,
    required: true,
    default: 0,
  },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: Object,
      default: {},
    },
    coverPicture: {
      type: Object,
      default: {},
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
      default: "",
    },
    city: {
      type: String,
      max: 50,
      default: "",
    },
    from: {
      type: String,
      max: 50,
      default: "",
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    birthday: {
      type: Date,
    },
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    resetTokenDetails: {
      email: {
        type: String,
        default: "",
      },
      token: {
        type: String,
        default: "",
      },
      expiresAt: {
        type: String,
        default: "",
      },
    },
    timeSpentInApp: [timeSpentInApp],
    isNotificationsEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
