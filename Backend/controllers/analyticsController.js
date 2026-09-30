const Order = require("../model/order.js");
const Product = require("../model/product.js");
const User = require("../model/user.js");

const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({ role: "user" });

    const order = await Order.find({});

    const toalRevenueData = order.reduce(
      (acc, order) => acc + order.totalPrice,
      0,
    );

    return res.json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue: toalRevenueData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getAdminStats;
