const { transporter } = require("../../mailconfig");
const { userModal } = require("../../modal/website/userModal");
const jwt = require("jsonwebtoken");
let myMap = new Map(); // To store OTPs temporarily
const bcrypt = require("bcrypt");

// Function to send OTP email
let register = async (req, res) => {
  console.log(req.body);
  const email = req.body.useremail; // Assuming email is provided in the request

  // Check if email is already registered
  const existingUser = await userModal.findOne({ useremail: email });
  if (existingUser) {
    // If email already exists, return an error
    return res
      .status(400)
      .send({ status: 0, message: "Email already registered" });
  }

  // Generate a random OTP
  let OTP = Math.random().toString().slice(2, 6);

  // Store OTP in Map against the email as the key
  myMap.set(email, OTP);

  res.send({ status: 1, message: "OTP sent successfully", OTP });

  // Send mail with the defined transport object
  const info = await transporter.sendMail({
    from: '"Mehar Hafiza 👻" <maddison53@ethereal.email>',
    to: email, // receiver's email
    subject: "Your OTP for Verification",
    text: `Your OTP is: ${OTP}`,
    html: `
      <div style="text-align: center;">
        <p style="font-size: 18px;">Hello,</p>
        <p style="font-size: 18px;">Your OTP for verification is:</p>
        <p style="font-size: 55px; font-weight: bold">${OTP}</p>
        <p style="font-size: 18px;">Please use this OTP to complete your verification process.</p>
      </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
};

// Function to verify the OTP and register the user
let verifyOTP = async (req, res) => {
  const { useremail, otp, username, userpassword } = req.body;

  // Check if OTP exists for the provided email
  const storedOTP = myMap.get(useremail);

  if (!storedOTP) {
    return res.status(400).send({ status: 0, message: "OTP not found" });
  }

  // Check if the OTP matches
  if (storedOTP === otp) {
    // OTP is correct, proceed with verification
    res.send({ status: 1, message: "OTP verified successfully." });

    // Optionally, delete the OTP after successful verification
    myMap.delete(useremail);

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashPassword = await bcrypt.hash(userpassword, salt); // Hash the password

    // Store user data in database after successful OTP verification
    const data = {
      useremail,
      username,
      userpassword: hashPassword, // Use the hashed password here
    };

    // Save the user data to the database
    try {
      let userData = new userModal(data);
      const result = await userData.save();
      console.log(result);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ status: 0, message: "Error saving user data" });
    }
  } else {
    // OTP is incorrect
    return res.status(400).send({ status: 0, message: "Invalid OTP." });
  }
};
//login function
let login = async (req, res) => {
  let { uemail, upassword } = req.body;

  // Find the user by email
  let userloginData = await userModal.findOne({
    useremail: uemail,
  
  });
  if (userloginData) {
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      upassword,
      userloginData.userpassword
    );

    if (passwordMatch) {
      var token = jwt.sign({ userId: userloginData._id }, process.env.loginKey);
      let username = userloginData.username;
      let obj = {
        status: 1,
        message: "Login successful",
        data: userloginData,
        username: username,
        token
      };
      res.send(obj);
    } else {
      // If passwords do not match
      res.status(401).send({ status: 0, message: "Invalid password" });
    }
  } else {
    // User not found
    res.status(404).send({ status: 0, message: "User not found" });
  }
};

module.exports = { register, verifyOTP, login };
