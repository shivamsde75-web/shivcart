const Razorpay = require("razorpay");
const crypto = require("crypto");
dotenv = require("dotenv");
dotenv.config();

const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = {
      amount: req.body.totalPrice,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    const order = await instance.orders.create(options);
    return res.json({ order });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const{razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    const generate_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_payment_id + "|" + razorpay_order_id)
      .digest("hex");

      if (generate_signature === razorpay_signature) {
        res.status(200).json({ message: "Payment verified successfully" });
      } else {
        res.status(400).json({ message: "Payment verification failed" });
      }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};