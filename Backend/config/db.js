const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    res.status(200).json({ message: "MongoDB connected successfully" });
    return conn;
  } catch (error) {
    res
      .status(500)
      .json({ message: "MongoDB connection failed", error: error.message });
    process.exit(1);
  }
};

module.exports = connectDB;
