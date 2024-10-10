let mongoose = require("mongoose");
let productSchema = new mongoose.Schema(
  {
    productName: String,
    productDes: String,
    productShortDes: String,
    productImage: String,
    productGallery: Object,
    productStatus: Boolean,
    productParentCat: {
      type: mongoose.Types.ObjectId,
      ref: "parentcategory",
    },
    productSubParentCat: {
      type: mongoose.Types.ObjectId,
      ref: "subcategory",
    },
    productPrice: Number,
    productMrp: Number,
    productSize: [
      {
        type: mongoose.Types.ObjectId,
        ref: "size",
      },
    ],
    productColor: [
      {
        type: mongoose.Types.ObjectId,
        ref: "color",
      },
    ],
  },
  {
    timestamps: true,
  }
);
let productModal = mongoose.model("products" , productSchema);
module.exports = {productModal};
