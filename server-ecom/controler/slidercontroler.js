const { slidermodal } = require("../modal/slidermodal");
let fs = require("fs");
//inser slider function
let addslider = async (req, res) => {
  let data = {
    sliderName: req.body.sliderName,
    sliderHeading: req.body.sliderHeading,
    subHeading: req.body.subHeading,
    sliderStatus: req.body.sliderStatus,
  };
  if (req.file != undefined) {
    if (req.filename != "") {
      data["sliderImage"] = req.file.filename;
    }
  }
  let slider = new slidermodal(data);
  slider
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

//view slider function

let viewlider = (req, res) => {
  let limit = 2;
  let skipNumber = (req.query.pageNumber-1)*limit;
     // search functionality added here for search by colorName.
     let search = {};
     if (req.query.sliderName !== "" && req.query.sliderName  !== undefined) {
       search.sliderName = new RegExp(req.query.sliderName , "i");
     }
  slidermodal
    .find(search).skip(skipNumber).limit(limit)
    .then(async(result) => {
      let totalRecords = await slidermodal.find(search)
      let obj = {
        totalPage: Math.ceil(totalRecords.length/limit),
        limit : '',
        status: 1,
        data: result,
        path: "http://localhost:8000/upload/slider/",
      };
      res.send(obj);
    })
    .catch((error) => {
      console.log(error);
    });
};
//delete slider function
let deleteslider = async (req, res) => {
  let id = req.params.id;
  let delimage = await slidermodal.findById(id);
  let pathimage = "upload/slider/" + delimage.sliderImage;
  if (fs.existsSync(pathimage)) {
    fs.unlinkSync(pathimage);
  }
  slidermodal
    .deleteOne({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
//delete many 
let deletemulti = async (req, res) => {
  let ids = req.body.ids; // array of slider IDs to delete
  try {
    // Fetch all the sliders that match the given IDs
    let sliders = await slidermodal.find({ _id: ids});

    // Loop through each slider and delete their associated images
    for (let slider of sliders) {
      if (slider.sliderImage) {
        let pathimage = "upload/slider/" + slider.sliderImage;
        if (fs.existsSync(pathimage)) {
          fs.unlinkSync(pathimage); // Delete the slider image
        }
      }
    }

    // Now delete the sliders from the database
    await slidermodal.deleteMany({ _id: ids});

res.send({ status: 1, msg: "Sliders deleted successfully!" });
  } catch (error) {
    console.log(error);
  
  }
};
//edit slider function
let editslider = async (req, res) => {
  let id = req.params.id;
  let findData = await slidermodal.findById(id);
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj)
};
//update slider function
let updateslider =async (req,res) =>{
  let id = req.params.id;
  let data = {
    sliderName: req.body.sliderName,
    sliderHeading: req.body.sliderHeading,
    subHeading: req.body.subHeading,
    sliderStatus: req.body.sliderStatus,
  };
  if (req.file != undefined) {
    if (req.filename != "") {
      data["sliderImage"] = req.file.filename;
    }
  }
  await slidermodal.updateOne({_id:id} , {$set:data}).then((result) =>{
    let obj = {
      'status' : 1,
      'msg' : 'slider update successfully!',
      'data' : result
    }
    res.send(obj)
  })
  }
module.exports = { addslider, viewlider, deleteslider , deletemulti , editslider,updateslider };
