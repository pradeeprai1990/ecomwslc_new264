const { parentcatmodal } = require("../modal/parentcatmodal");
const { subcatmodal } = require("../modal/subcatmodal");
let fs = require("fs");
//insert api  function
let addsubcategory = async (req, res) => {
  let data = {
    subcategoryName: req.body.subcategoryName,
    subcategoryDes: req.body.subcategoryDes,
    parentcategory: req.body.parentcategory,
    subcategoryStatus: req.body.subcategoryStatus,
  };
  if (req.file != undefined) {
    if (req.filename != "") {
      data["categoryImage"] = req.file.filename;
    }
  }
  let subcat = new subcatmodal(data);
  subcat
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

//view sub category api function
let viewsubcategory = (req, res) => {
  let limit = 2;
  let skipNumber = (req.query.pageNumber-1)*limit;
  // search functionality added here for search by colorName.
  let search = {};
  if (
    req.query.subcategoryName !== "" &&
    req.query.subcategoryName !== undefined
  ) {
    search.subcategoryName = new RegExp(req.query.subcategoryName, "i");
  }
  subcatmodal
    .find(search).skip(skipNumber).limit(limit)
    .populate("parentcategory")
    .then(async(result) => {
      let totalRecords = await parentcatmodal.find(search)
      let obj = {
        limit : '' , 
        totalPage:Math.ceil(totalRecords.length/limit),
        status: 1,
        data: result,
        path: "http://localhost:8000/upload/subcategory/",
      };
      res.send(obj);
    })
    .catch((error) => {
      console.log(error);
    });
};

//delete subcategory api function

let deletesubcat = async (req, res) => {
  let id = req.params.id;
  try {
    let delimage = await subcatmodal.findById(id);
    let pathimage = "upload/subcategory/" + delimage.categoryImage;

    if (fs.existsSync(pathimage)) {
      fs.unlinkSync(pathimage); // Delete the subcategory image
    }

    await subcatmodal.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

// Delete many subcategories (updated)
let deletemulti = async (req, res) => {
  let ids = req.body.ids; // Array of subcategory IDs to delete
  try {
    // Fetch all subcategories that match the given IDs
    let subcategories = await subcatmodal.find({ _id: ids });

    // Loop through each subcategory and delete its associated image
    for (let subcat of subcategories) {
      if (subcat.categoryImage) {
        let delimagepath = "upload/subcategory/" + subcat.categoryImage;
        if (fs.existsSync(delimagepath)) {
          fs.unlinkSync(delimagepath); // Delete the subcategory image
        }
      }
    }

    // Now delete the subcategories from the database
    await subcatmodal.deleteMany({ _id: ids });
    res.send({ status: 1, msg: "Subcategory deleted successfully!" });
  } catch (error) {
    console.log(error);
  }
};
//edit category function
let editcategory = async (req, res) => {
  let id = req.params.id;
  let findData = await subcatmodal.findById(id);
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj);
};
//update subcategory function
let updatesubcategory = async (req, res) => {
  let id = req.params.id;
  let data = {
    subcategoryName: req.body.subcategoryName,
    subcategoryDes: req.body.subcategoryDes,
    parentcategory: req.body.parentcategory,
    subcategoryStatus: req.body.subcategoryStatus,
  };
  if (req.file != undefined) {
    if (req.filename != "") {
      data["categoryImage"] = req.file.filename;
    }
  }
  await subcatmodal.updateOne({ _id: id }, { $set: data }).then((result) => {
    let obj = {
      status: 1,
      msg: "subcategory update successfully!",
      data: result,
    };
    res.send(obj);
  });
};
//parent category function

let parentcategory = async (req, res) => {
  let parentCat = await parentcatmodal.find({ categoryStatus: 1 });
  let obj = {
    status: 1,
    msg: "subcategory update successfully!",
    data: parentCat,
  };
  res.send(obj);
};
//http://localhost:8000/admin/subcat/parentcategory
module.exports = {
  addsubcategory,
  viewsubcategory,
  deletesubcat,
  deletemulti,
  editcategory,
  updatesubcategory,
  parentcategory,
};
