let express = require("express");
const { registerRoute } = require("./registerRoute");
const { productRoute } = require("./productRoute");
const { sliderRoute } = require("./sliderRoute");
const { subcatRoute } = require("./subcatRoute");
const { storyRoute } = require("./storyRoute");
const { orderRoutes } = require("./orderRoutes");
let website = express();

website.use("/user", registerRoute);
//product routs
website.use("/product", productRoute);
//slider routes
website.use("/slider" , sliderRoute)
//subcat toute
website.use("/subcat" , subcatRoute);
//story routs
website.use("/story", storyRoute);

website.use("/order", orderRoutes);
module.exports = { website };
