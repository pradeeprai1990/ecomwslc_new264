const { storymodal } = require("../../modal/storymodal");

let story =async (req,res) =>{
    let story = await storymodal.find();
    let obj = {
        status: 1,
        data: story,
        path: "http://localhost:8000/upload/story/",
    
    }
    res.send(obj)
}

module.exports = {story}