const { slidermodal } = require("../../modal/slidermodal")

let Slider =async (req,res) =>{
let slider = await slidermodal.find();
let obj = {
    status: 1,
    data: slider,
    path: "http://localhost:8000/upload/slider/",

}
res.send(obj)
}
module.exports = {Slider}