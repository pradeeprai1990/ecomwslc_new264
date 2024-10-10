let mongoose = require("mongoose");

let sizename = new mongoose.Schema(
  {
    sizeName: {
      type: String,
      required: true,
    },

    sizeStatus: {
      type: Boolean,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
let sizemodal = mongoose.model("size", sizename);
module.exports = { sizemodal };
