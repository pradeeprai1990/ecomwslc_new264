let express = require("express");
let multer = require("multer");
const {
  addProduct,
  getAllParentCategory,
  getSize,
  getColor,
  getSubCategory,
  viewProduct,
  deleteProduct,
  multidel,
  editProduct,
  updateProduct,
} = require("../controler/productController");
//fileupload process multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/product");
  },
  filename: function (req, file, cb) {
    let imageName = Date.now() + file.originalname;
    cb(null, imageName);
  },
});
const upload = multer({ storage: storage }).fields([
  {
    name: "productImage",
    maxCount: 1,
  },
  {
    name: "productGallery",
    maxCount: 10,
  },
]);

let productRoute = express.Router();
// add product  api
productRoute.post("/insert-product", upload, addProduct);
//api for category
productRoute.get("/category", getAllParentCategory);
productRoute.get("/subcategory/:pid", getSubCategory);
productRoute.get("/size", getSize);
productRoute.get("/color", getColor);
//view product api route
productRoute.get("/view-product" , viewProduct)
//delete product api

productRoute.delete("/delete-product/:id", deleteProduct);
// delete multi api 

productRoute.post("/deletemulti" , multidel)

//edit product api

productRoute.get(`/edit/:id?` , editProduct)
//update category api
productRoute.put("/update/:id" ,upload, updateProduct)


module.exports = { productRoute };
