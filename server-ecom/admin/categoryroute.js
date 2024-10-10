let express = require("express");
let multer = require("multer");
const { addcategory, viewcategory, removecategory, deletemulti, editcategory, updatecategory } = require("../controler/categorycontroller");
//fileupload process multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload/category");
    },
    filename: function (req, file, cb) {
      let imageName = Date.now() + file.originalname;
      cb(null, imageName);
    },
  });
  
  const upload = multer({ storage: storage });
let category = express.Router();
// add category api
category.post("/insert" ,upload.single('categoryImage'),addcategory)
// view category api
category.get("/view" , viewcategory)

//remove category api
category.delete("/delete/:id" , removecategory)
// delete multi api 

category.post("/deletemulti" , deletemulti)
//edit category
category.get(`/edit/:id?` , editcategory)

//update category api
category.put("/update/:id" ,upload.single('categoryImage'), updatecategory)
module.exports = {category}

//http://localhost:8000/admin/category/insert