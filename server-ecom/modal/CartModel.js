let mongoose = require("mongoose");

let cartSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    qty: {
      type: Number,
      required: true,
    },
    productId:{
        type: mongoose.Types.ObjectId,
        ref: "products",
    },
    price:{
        type:Number
    }
    
  },
  {
    timestamps: true,
  }
);
let cartModel = mongoose.model("parentcategory", cartSchema);
module.exports = { cartModel };
