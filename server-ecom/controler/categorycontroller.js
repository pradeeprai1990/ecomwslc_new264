const { parentcatmodal } = require("../modal/parentcatmodal");
let fs = require("fs");
var slugify = require('slugify')
//add category function
let addcategory = async (req, res) => {
  let data = {
    categoryName: req.body.categoryName,
    categoryDes: req.body.categoryDes,
    categoryStatus: req.body.categoryStatus,
    slug:slugify(req.body.categoryName, {
      replacement: '-',  // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: false,      // convert to lower case, defaults to `false`
      strict: false,     // strip special characters except replacement, defaults to `false`
      locale: 'vi',      // language code of the locale to use
      trim: true         // trim leading and trailing replacement chars, defaults to `true`
    })
  };
  if (req.file != undefined) {
    if (req.filename != "") {
      data["categoryImage"] = req.file.filename;
    }
  }
  let category = new parentcatmodal(data);
  category
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
//add category function end
// view categpry function

let viewcategory = (req, res) => {
  let limit = 2;
  let skipNumber = (req.query.pageNumber-1)*limit;
    // search functionality added here for search by colorName.
    let search = {};
    if (req.query.categoryName !== "" && req.query.categoryName!== undefined) {
      search.categoryName = new RegExp(req.query.categoryName, "i");
    }
  parentcatmodal
    .find(search).skip(skipNumber).limit(limit)
    .then(async(result) => {
      let totalRecords = await parentcatmodal.find(search)
      let obj = {
        limit : '' , 
        totalPage: Math.ceil(totalRecords.length/limit),
        status: 1,
        data: result,
        path: "http://localhost:8000/upload/category/",
      };
      res.send(obj);
    })
    .catch((error) => {
      console.log(error);
    });
};

//remove category function

let removecategory = async (req, res) => {
  let id = req.params.id;
  let delimage = await parentcatmodal.findById(id);
  let delimagepath = "upload/category/" + delimage.categoryImage;
  console.log(delimagepath);
  if (fs.existsSync(delimagepath)) {
    fs.unlinkSync(delimagepath);
  }
  parentcatmodal
    .deleteOne({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console / log(error);
    });
};
// Delete many records function (updated)
let deletemulti = async (req, res) => {
  let ids = req.body.ids; // Array of category IDs to delete
  try {
    // Fetch all categories that match the given IDs
    let categories = await parentcatmodal.find({ _id: ids });

    // Loop through each category and delete its associated image
    for (let category of categories) {
      if (category.categoryImage) {
        let delimagepath = "upload/category/" + category.categoryImage;
        if (fs.existsSync(delimagepath)) {
          fs.unlinkSync(delimagepath); // Delete the category image
        }
      }
    }

    // Now delete the categories from the database
    await parentcatmodal.deleteMany({ _id: ids });
    res.send({ status: 1, msg: "Category deleted successfully!" });
  } catch (error) {
    console.log(error);
  }
};
//edit category function
let editcategory = async (req, res) => {
  let id = req.params.id;
  let findData = await parentcatmodal.findById(id);
  let obj = {
    'status': 1,
    'data': findData,
  };
  res.send(obj);
};
//update category function
let updatecategory =async (req,res) =>{
  let id = req.params.id;
  let data = {
    categoryName: req.body.categoryName,
    categoryStatus: req.body.categoryStatus,
    categoryDes: req.body.categoryDes,
  };
  if (req.file != undefined) {
    if (req.filename != "") {
      data["categoryImage"] = req.file.filename;
    }
  }
  await parentcatmodal.updateOne({_id:id} , {$set:data}).then((result) =>{
    let obj = {
      'status' : 1,
      'msg' : 'category update successfully!',
      'data' : result
    }
    res.send(obj)
  })
  }
module.exports = {
  addcategory,
  viewcategory,
  removecategory,
  deletemulti,
  editcategory,
  updatecategory
};



//http://localhost:8000/admin/category/insert
