const { storymodal } = require("../modal/storymodal");
let fs = require("fs");
// Add story function
let addstory = async (req, res) => {
  let data = {
    storyName: req.body.storyName,
    storyDes: req.body.storyDes,
    storyStatus: req.body.storyStatus,
  };

  // Check and assign uploaded files (storyImage and bannerImage)
  if (req.files) {
    if (req.files["storyImage"] && req.files["storyImage"][0]) {
      data["storyImage"] = req.files["storyImage"][0].filename;
    }
    if (req.files["bannerImage"] && req.files["bannerImage"][0]) {
      data["bannerImage"] = req.files["bannerImage"][0].filename;
    }
  }

  let story = new storymodal(data);

  story
    .save()
    .then((result) => {
      console.log(result);
      res.send("story added successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

//view story function

let viewstory = (req, res) => {
  let limit = 2;
  let skipNumber = (req.query.pageNumber-1)*limit;
  // search functionality added here for search by colorName.
  let search = {};
  if (req.query.storyName !== "" && req.query.storyName !== undefined) {
    search.storyName = new RegExp(req.query.storyName, "i");
  }
  storymodal
    .find(search).skip(skipNumber).limit(limit)
    .then(async(result) => {
      let totalRecords = await storymodal.find(search)
      let obj = {
        totalPage: Math.ceil(totalRecords.length/limit),
        limit : '',
        status: 1,
        data: result,
        path: "http://localhost:8000/upload/story/",
      };

      res.send(obj);
    })
    .catch((error) => {
      console.log(error);
    });
};

//delete story function
let deletestory = async (req, res) => {
  let id = req.params.id;
  let deliamge = await storymodal.findById(id);
  let pathimage = "upload/story/" + deliamge.storyImage;
  if (fs.existsSync(pathimage)) {
    fs.unlinkSync(pathimage);
  }
  let deliamge1 = await storymodal.findById(id);
  let pathimage1 = "upload/story/" + deliamge1.bannerImage;
  if (fs.existsSync(pathimage1)) {
    fs.unlinkSync(pathimage1);
  }
  storymodal
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
  let ids = req.body.ids; // array of story IDs to delete
  try {
    // Fetch all the stories that match the given IDs
    let stories = await storymodal.find({ _id: ids });

    // Loop through each story and delete their associated images
    for (let story of stories) {
      if (story.storyImage) {
        let pathimage = "upload/story/" + story.storyImage;
        if (fs.existsSync(pathimage)) {
          fs.unlinkSync(pathimage); // Delete storyImage
        }
      }

      if (story.bannerImage) {
        let pathimage1 = "upload/story/" + story.bannerImage;
        if (fs.existsSync(pathimage1)) {
          fs.unlinkSync(pathimage1); // Delete bannerImage
        }
      }
    }

    // Now delete the stories from the database
    await storymodal.deleteMany({ _id: ids });

    res.send("successfully delted");
  } catch (error) {
    console.log(error);
  }
};

//edit story function
let editstory = async (req, res) => {
  let id = req.params.id;
  let findData = await storymodal.findById(id);
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj);
};
//update story function
let updatestory = async (req, res) => {
  let id = req.params.id;
  let data = {
    storyName: req.body.storyName,
    storyDes: req.body.storyDes,
    storyStatus: req.body.storyStatus,
  };
  // Check and assign uploaded files (storyImage and bannerImage)
  if (req.files) {
    if (req.files["storyImage"] && req.files["storyImage"][0]) {
      data["storyImage"] = req.files["storyImage"][0].filename;
    }
    if (req.files["bannerImage"] && req.files["bannerImage"][0]) {
      data["bannerImage"] = req.files["bannerImage"][0].filename;
    }
  }
  await storymodal.updateOne({ _id: id }, { $set: data }).then((result) => {
    let obj = {
      status: 1,
      msg: "story update successfully!",
      data: result,
    };
    res.send(obj);
  });
};
module.exports = {
  addstory,
  viewstory,
  deletestory,
  deletemulti,
  editstory,
  updatestory,
};
