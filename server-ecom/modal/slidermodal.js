let mongoose = require("mongoose");

let slidername = new mongoose.Schema(
  {
    sliderName: {
      type: String,
      required: true,
    },
    sliderHeading: {
      type: String,
      required: false,
    },
    subHeading: {
      type: String,
      required: false,
    },
    sliderImage: {
      type: String,
      required: true,
    },
    sliderStatus: {
      type: Boolean,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
let slidermodal = mongoose.model("slider", slidername);
module.exports = { slidermodal };
