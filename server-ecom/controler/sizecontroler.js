const { sizemodal } = require("../modal/sizemodal");

//addsize function
let addsize = (req, res) => {
  let data = {
    sizeName: req.body.sizeName,
    sizeStatus: req.body.sizeStatus,
  };
  let size = new sizemodal(data);
  size
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

//viewsize function

let viewsize = (req, res) => {
  let limit = 2;
  let skipNumber = (req.query.pageNumber-1)*limit;
    // search functionality added here for search by colorName.
    let search = {};
    if (req.query.sizeName !== "" && req.query.sizeName  !== undefined) {
      search.sizeName  = new RegExp(req.query.sizeName  , "i");
    }
  sizemodal
    .find(search).skip(skipNumber).limit(limit)
    .then(async(result) => {
      let totalRecords = await sizemodal.find(search)
      let obj = {
        totalPage: Math.ceil(totalRecords.length/limit),
        limit : '',
        status: 1,
        data: result,
      };
      res.send(obj);
    })
    .catch((error) => {
      console.log(error);
    });
};
//delete size function
let deletesize = (req,res) =>{
  let id = req.params.id;
  sizemodal.deleteOne({_id:id}).then((result) =>{
    res.send(result)
  }).catch((error) =>{
    console.log(error)
  })
}
//delete many 
let deletemulti = async (req, res) => {
  let ids = req.body.ids;
 await sizemodal
    .deleteMany({ _id: ids })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
//edit color function
let editsize = async (req, res) => {
  let id = req.params.id;
  let findData = await sizemodal.findById(id);
  let obj = {
    status: 1,
    data: findData,
  };
  res.send(obj)
};
//update size function
let updatesize =async (req,res) =>{
  let id = req.params.id;
  let data = {
    sizeName: req.body.sizeName,
    sizeStatus: req.body.sizeStatus,
  };

  await sizemodal.updateOne({_id:id} , {$set:data}).then((result) =>{
    let obj = {
      'status' : 1,
      'msg' : 'size update successfully!',
      'data' : result
    }
    res.send(obj)
  })
  }
module.exports = { addsize, viewsize , deletesize , deletemulti , editsize , updatesize };
