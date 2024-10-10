
const { subcatmodal } = require("../../modal/subcatmodal");

let subcat =async (req,res) =>{
let subcat = await subcatmodal.find();
let obj = {
    status: 1,
    data: subcat,
    path: "http://localhost:8000/upload/subcategory/",

}
res.send(obj)
}
module.exports = {subcat}