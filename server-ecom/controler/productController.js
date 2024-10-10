const { colormodal } = require("../modal/colormodal");
const { parentcatmodal } = require("../modal/parentcatmodal");
const { productModal } = require("../modal/productModal");
const { sizemodal } = require("../modal/sizemodal");
const { subcatmodal } = require("../modal/subcatmodal");
let fs = require("fs");
//parentcat function
let getAllParentCategory = async (req, res) => {
  let findData = await parentcatmodal.find({ categoryStatus: 1 });
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj);
};
//getsize function
let getSize = async (req, res) => {
  let findData = await sizemodal.find({ sizeStatus: 1 });
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj);
};
//getcolor function
let getColor = async (req, res) => {
  let findData = await colormodal.find({ colorStatus: 1 });
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj);
};
//get subcategory function
let getSubCategory = async (req, res) => {
  let pid = req.params.pid;
  let findData = await subcatmodal.find({ parentcategory: pid });
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj);
};

//add product function
let addProduct = async (req, res) => {
  let data = {
    productName: req.body.productName,
    productDes: req.body.productDes,
    productShortDes: req.body.productShortDes,
    productParentCat: req.body.parentCategory,
    productSubParentCat: req.body.subCategory,
    productSize: req.body.size,
    productColor: req.body.color,
    productPrice: req.body.productPrice,
    productMrp: req.body.productMrp,
  };

  if (req.files) {
    if (req.files.productImage) {
      data.productImage = req.files.productImage[0].filename;
    }

    if (req.files.productGallery) {
      let allImages = req.files.productGallery.map((img) => img.filename);
      data.productGallery = allImages;
    }
  }
  const dataSave = new productModal(data);
  const response = await dataSave.save();
  res.send(response);
};
//add product function
let viewProduct = (req, res) => {
  // search functionality added here for search by colorName.
  let search = {};
  if (req.query.productName !== "" && req.query.productName !== undefined) {
    search.productName = new RegExp(req.query.productName, "i");
  }
  productModal
    .find(search)
    .populate("productParentCat")
    .populate("productSubParentCat")
    .populate("productSize")
    .populate("productColor")
    .then((result) => {
      let obj = {
        status: 1,
        data: result,
        path: "http://localhost:8000/upload/product/",
      };
      res.send(obj);
    })
    .catch((error) => {
      console.log(error);
    });
};
//delete product

let deleteProduct = async (req, res) => {
  let id = req.params.id;
  try {
    let delimage = await productModal.findById(id);
    let pathimage = "upload/product/" + delimage.productImage;

    if (fs.existsSync(pathimage)) {
      fs.unlinkSync(pathimage); // Delete the thumbnail image
    }
    for (let galleryImage of delimage.productGallery) {
      let galleryImagePath = "upload/product/" + galleryImage;
      if (fs.existsSync(galleryImagePath)) {
        fs.unlinkSync(galleryImagePath); // Delete each gallery image
      }
    }

    await productModal.deleteOne({ _id: id });
    res.send({ status: 1, msg: "Product deleted successfully!" });
  } catch (error) {
    console.log(error);
  }
};

//multiple delete api function
let multidel = async (req, res) => {
  let ids = req.body.ids;
  // Fetch all subcategories that match the given IDs
  let AllProducts = await productModal.find({ _id: ids });
  // loop through each product and delete its img
  for (let product of AllProducts) {
    // Delete the product 1 image 
    if (product.productImage) {
      let productImagePath = "upload/product/" + product.productImage;
      if (fs.existsSync(productImagePath)) {
        fs.unlinkSync(productImagePath); // Delete the product image
      }
    }

    // Delete the product gallery images (array of images)
    if (product.productGallery && product.productGallery.length > 0) {
      for (let galleryImage of product.productGallery) {
        let galleryImagePath = "upload/product/" + galleryImage;
        if (fs.existsSync(galleryImagePath)) {
          fs.unlinkSync(galleryImagePath); // Delete each gallery image
        }
      }
    }
  }

  productModal
    .deleteMany({ _id: ids })
    .then((apires) => {
      console.log(apires);
      res.send({ status: 1, msg: "Product deleted successfully!" });
    })
    .catch((error) => {
      console.log(error);
    });
};

//edit product function
let editProduct =async (req,res) =>{
  let id = req.params.id;
  let findData = await productModal.findById(id);
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj);
}
//update product function
let updateProduct = async (req,res) =>{
  let id = req.params.id;
  let data = {
    productName: req.body.productName,
    productDes: req.body.productDes,
    productShortDes: req.body.productShortDes,
    parentcategory: req.body.parentcategory,
    subCategory: req.body.subCategory,
    productPrice: req.body.productPrice,
    productMrp:req.body.productMrp,
    size: req.body.size,
    color: req.body.color,
    productStatus: req.body.productStatus,
  };
  if (req.file != undefined) {
    if (req.filename != "") {
      data["productImage"] = req.file.filename;
    }
  }
  await subcatmodal.updateOne({_id:id} , {$set:data}).then((result) =>{
    let obj = {
      'status' : 1,
      'msg' : 'subcategory update successfully!',
      'data' : result
    }
    res.send(obj)
  })
}
module.exports = {
  addProduct,
  getAllParentCategory,
  getSize,
  getColor,
  getSubCategory,
  viewProduct,
  deleteProduct,
  multidel,
  editProduct,
  updateProduct
};
