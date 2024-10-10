let express = require("express");
let multer = require("multer");
const { addslider, viewlider, deleteslider, deletemulti, editslider, updateslider } = require("../controler/slidercontroler");
//fileupload process multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload/slider");
    },
    filename: function (req, file, cb) {
      let imageName = Date.now() + file.originalname;
      cb(null, imageName);
    },
  });
  
  const upload = multer({ storage: storage });
let slider = express.Router();
//insert slider api
slider.post("/insert" ,upload.single('sliderImage'),addslider)
//view slider api
slider.get("/view" , viewlider)
//delete slider api
slider.delete("/delete/:id" , deleteslider)
// delete multi api 

slider.post("/deletemulti" , deletemulti)
//edit size api
slider.get(`/edit/:id?` , editslider)
//update slider api
slider.put("/update/:id" ,upload.single('sliderImage'), updateslider)

module.exports = {slider}