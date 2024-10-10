let express = require("express");

let multer = require("multer");

const {
  addstory,
  viewstory,
  deletestory,
  deletemulti,
  editstory,
  updatestory,
} = require("../controler/storycontroler");
let story = express.Router();

// File upload process with multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/story");
  },
  filename: function (req, file, cb) {
    let imageName = Date.now() + file.originalname;
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

// Add story route for handling multiple images (storyImage and bannerImage)
story.post(
  "/insert",
  upload.fields([
    { name: "storyImage", maxCount: 1 }, // for story image
    { name: "bannerImage", maxCount: 1 }, // for banner image
  ]),
  addstory
);

//view story route

story.get("/view", viewstory);
//delete story api
story.delete("/delete/:id", deletestory);
// delete multi api

story.post("/deletemulti", deletemulti);
//edit size api
story.get(`/edit/:id?`, editstory);

//update story api
story.put(
  "/update/:id",
  upload.fields([
    { name: "storyImage", maxCount: 1 }, // for story image
    { name: "bannerImage", maxCount: 1 }, // for banner image
  ]),
  updatestory
);
module.exports = { story };
