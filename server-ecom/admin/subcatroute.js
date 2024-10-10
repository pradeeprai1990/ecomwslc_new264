let express = require("express");
let multer = require("multer");
const { addsubcategory, viewsubcategory, deletesubcat, deletemulti, editcategory, updatesubcategory, parentcategory } = require("../controler/subcatcontroler");

//fileupload process multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload/subcategory");
    },
    filename: function (req, file, cb) {
      let imageName = Date.now() + file.originalname;
      cb(null, imageName);
    },
  });
  const upload = multer({ storage: storage });
  let subcategory = express.Router();

  // add category api
subcategory.post("/insert" ,upload.single('categoryImage'), addsubcategory)
//view category api
subcategory.get("/view" , viewsubcategory)

//delete subcat api
subcategory.delete("/delete/:id" , deletesubcat)
// delete multi api 

subcategory.post("/deletemulti" , deletemulti)

//edit category api
subcategory.get(`/edit/:id?` , editcategory)
//update category api
subcategory.put("/update/:id" ,upload.single('categoryImage'), updatesubcategory)

//parent category route
subcategory.get(`/parentcategory` , parentcategory)
//http://localhost:8000/admin/subcat/parentcategory
module.exports = {subcategory}