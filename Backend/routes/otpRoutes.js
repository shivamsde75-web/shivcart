const express = require("express");
const router = express.Router();
const sendOtp = require("../controllers/sendOtpController.js");
const otpVerification = require("../controllers/otpVerifycontroller.js");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", otpVerification);

module.exports = router;
