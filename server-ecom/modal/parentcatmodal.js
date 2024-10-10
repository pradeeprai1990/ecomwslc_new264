let mongoose = require("mongoose");

let parentcatname = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryDes: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
    categoryImage: {
      type: String,
      required: false,
    },
    categoryStatus: {
      type: Boolean,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
let parentcatmodal = mongoose.model("parentcategory", parentcatname);
module.exports = { parentcatmodal };
