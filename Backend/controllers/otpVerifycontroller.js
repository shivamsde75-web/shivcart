const user = require("../model/user");

const otpVerifyController = async (req, res) => {
  const { email, otp } = req.body;
  const userData = await user.findOne({ email });
  if (userData) {
    if (userData.otp === otp) {
      userData.otp = null;
      userData.verified = true;
      await userData.save();
      res.status(200).json({
        message: "OTP Verified",
        data: userData,
      });
    } else {
      res.status(400).json({
        message: "OTP Verification Failed Please Try Again...",
        data: null,
      });
    }
  } else {
    res.status(400).json({
      message: "User Not Found",
      data: null,
    });
  }
};

module.exports = otpVerifyController;
