let express = require("express");
const mongoose = require("mongoose");
const { route } = require("./route");
let cors = require("cors");
const { adminmodal } = require("./modal/adminModal");
let app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

//for static path of img
app.use("/upload/category", express.static("upload/category"));
app.use("/upload/story", express.static("upload/story"));
app.use("/upload/slider", express.static("upload/slider"));
app.use("/upload/subcategory", express.static("upload/subcategory"));
app.use("/upload/product", express.static("upload/product"));

app.use(route);

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`).then(() => {
  app.listen("8000", async () => {
    console.log("server has been run");
    let checkdata = await adminmodal.find();
    if (checkdata.length == 0) {
      let obj = {
        adminName: "admin@gmail.com",
        adminPassword: "12345",
      };
      let adminTabel = new adminmodal(obj);
      await adminTabel.save();
    }
  });
});
