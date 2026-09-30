const sendEmail = require("../utils/sendEmail.js");
const User = require("../model/user.js");

const sendOtpEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpexpiration = new Date(Date.now() + 1 * 60 * 1000); // OTP expires in 10 minutes

  user.otp = otp;
  
  user.otpexpiration = otpexpiration;
  await user.save();

  const message = `
    Welcome to Shivcart,

    Dear ${user.name},

  You have successfully registered on our platform.
  Welcome to our application! Your account has been successfully created.
  Please use the following OTP to verify your account.

  Your OTP is  ${otp}.  Please do not share it with anyone.
    
    Thank you.`;

  const emailResult = await sendEmail(email, "OTP Verification", message);
  if (!emailResult.success) {
    return res.status(500).json({
      message: emailResult.message || "Failed to send OTP email",
    });
  }

  return res.status(200).json({ message: "OTP sent successfully" });
};

module.exports = sendOtpEmail;
