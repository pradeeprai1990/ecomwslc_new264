const { colormodal } = require("../modal/colormodal");
//insert color function
let addcolor = async (req, res) => {
  let data = {
    colorName: req.body.colorName,
    colorStatus: req.body.colorStatus,
    colorCode: req.body.colorCode,
  };
  let color = new colormodal(data);
  color
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

//view color function
let viewcolor = (req, res) => {
  let limit = 2;
  let skipNumber = (req.query.pageNumber-1)*limit;
  // search functionality added here for search by colorName.
  let search = {};
  if (req.query.colorName !== "" && req.query.colorName !== undefined) {
    search.colorName = new RegExp(req.query.colorName, "i");
  }
  colormodal.find(search).skip(skipNumber).limit(limit)
  .then(async(result) => {
    let totalRecords = await colormodal.find(search)
    let obj = {
      totalPage: Math.ceil(totalRecords.length/limit),
      limit : '',
      status: 1,
      data: result,
    };
    res.send(obj);
  });
};
//delete color function
let deletecolor = (req, res) => {
  colormodal
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
//delete many records fuction
let deletemulti = async (req, res) => {
  let ids = req.body.ids;
  console.log(req.body);
  console.log(ids);
  await colormodal
    .deleteMany({ _id: ids })
    .then((apires) => {
      console.log(apires);
    })

    .catch((error) => {
      console.log(error);
    });
    res.send({ status: 1, msg: "Color deleted successfully!" });
};

//edit color function
let editcolor = async (req, res) => {
  let id = req.params.id;
  let findData = await colormodal.findById(id);
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj);
};

//update color function
let updatecolor = async (req, res) => {
  let id = req.params.id;
  let data = {
    colorName: req.body.colorName,
    colorStatus: req.body.colorStatus,
    colorCode: req.body.colorCode,
  };

  await colormodal.updateOne({ _id: id }, { $set: data }).then((result) => {
    let obj = {
      status: 1,
      msg: "color update successfully!",
      data: result,
    };
    res.send(obj);
  });
};
module.exports = {
  addcolor,
  viewcolor,
  deletecolor,
  deletemulti,
  editcolor,
  updatecolor,
};
