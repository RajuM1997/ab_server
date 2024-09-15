const mongoose = require("mongoose");

const Team = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Team", Team);
