const jwt = require("jsonwebtoken");
const { adminmodal } = require("../modal/adminModal");

let checkAuth = async (req, res, next) => {
    let adminData;
  try {
    // Get token from authorization header
    let getToken = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(getToken, process.env.TokenKey);
    let Id = decoded.adminId;

    // Check if admin exists
    adminData = await adminmodal.findById(Id);

    console.log(adminData);
    next();
  } catch (error) {
    adminData = [];
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
  if (adminData.length == 0) {
    let obj = {
      status: 0,
      msg: "Token is not valid",
      data: adminData,
    };
 res.send(obj)
  }
};

module.exports = { checkAuth };
