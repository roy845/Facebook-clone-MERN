const { mongoose } = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    files: [
      {
        id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        publish: {
          type: Boolean,
          default: false,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

// storySchema.index({ "files.expirationDate": 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Story", storySchema);
