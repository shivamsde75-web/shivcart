const Order = require("../model/order.js");
const Product = require("../model/product.js");
const User = require("../model/user.js");

const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({});

    const order = await Order.find({});

    const totalRevenueData = order.reduce(
      (acc, currentOrder) => acc + (Number(currentOrder.totalPrice) || 0),
      0,
    );

    return res.json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue: totalRevenueData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error" }, error.message);
  }
};

module.exports = getAdminStats;
