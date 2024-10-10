const { colormodal } = require("../../modal/colormodal");
const { parentcatmodal } = require("../../modal/parentcatmodal");
const { productModal } = require("../../modal/productModal");
const { sizemodal } = require("../../modal/sizemodal");
const { subcatmodal } = require("../../modal/subcatmodal");

let addProduct = async (req, res) => {
  let parentCat = await parentcatmodal.find();
  let obj = {
    status: 1,
    msg: "Product added successfully!",
    data: parentCat,
  };
  res.send(obj);
};
//product data function
let productData = async (req, res) => {
    let { slug } = req.params;
 
    // Fetch the parent category using the slug
    let categoryData = await parentcatmodal.findOne({ slug: slug });
  
    if (categoryData) {
      let catId = categoryData._id;
  
      // Fetch the subcategories using the parent category's ID
      let subcatData = await subcatmodal.find({ parentcategory: catId });
  
      // Fetch products that belong to those subcategories
      let productData = await productModal.find({
        productSubParentCat: { $in: subcatData.map(subcat => subcat._id) }, // Matching subcategory IDs
      });
  
      // Extract unique size values from the products
      let productSizeIds = productData.map(product => product.productSize).flat();
   // Extract unique color values from the products
   let productColorIds = productData.map(product => product.productColor).flat();
      // Fetch sizes using the size IDs found in the products
      let size = await sizemodal.find({
        _id: { $in: productSizeIds }
      });
      let color = await colormodal.find({
        _id: { $in: productColorIds }
      });
  
      // Create the response object
      let obj = {
        status: 1,
        msg: "Product data fetched successfully!",
        parentCat: categoryData,
        subcatData: subcatData,
        productData: productData,
        size: size, 
        color: color,

        path: "http://localhost:8000/upload/product/",

      };
  
      // Send the response
      res.send(obj);
      console.log(obj);
    } else {
      res.status(404).send({ status: 0, msg: "Category not found!" });
    }
  };
  //product detail
  let productDetail = async (req, res) => {
    let { id } = req.params; // Get the product id from request params
  
    try {
      // Fetch the product by its ID
      let productData = await productModal.findById(id);
  
      if (productData) {
        // Extract size and color IDs from the product
        let productSizeIds = productData.productSize;
        let productColorIds = productData.productColor;
  
        // Fetch the sizes using the size IDs found in the product
        let size = await sizemodal.find({
          _id: { $in: productSizeIds }
        });
  
        // Fetch the colors using the color IDs found in the product
        let color = await colormodal.find({
          _id: { $in: productColorIds }
        });
  
        // Create the response object
        let obj = {
          status: 1,
          msg: "Product data fetched successfully!",
          productData: productData,
          size: size, 
          color: color,
          path: "http://localhost:8000/upload/product/",
        };
  
        // Send the response
        res.send(obj);
        console.log(obj);
      } else {
        // If the product with the provided ID is not found, return a 404 response
        res.status(404).send({ status: 0, msg: "Product not found!" });
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      res.status(500).send({ status: 0, msg: "Server error!" });
    }
  };
  
  
module.exports = { addProduct, productData , productDetail };
