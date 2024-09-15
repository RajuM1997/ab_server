const mongoose = require("mongoose");

const Gallery = new mongoose.Schema(
  {
    photo: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Gallery", Gallery);
