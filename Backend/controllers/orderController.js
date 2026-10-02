const Order = require("../model/order.js");
const Product = require("../model/product.js");
const sendMail = require("../utils/sendEmail.js");

const createOrder = async (req, res) => {
  try {
    const { address, quantity } = req.body;
    const userId = req.user._id;
    const itemId = req.params.id;

    const product = await Product.findById(itemId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const orderQuantity = Number(quantity) || 1;
    const productPrice = Number(product.price) || 0;
    const totalPrice = productPrice * orderQuantity;

    const order = await Order.create({
      itemId,
      address,
      userId,
      quantity: orderQuantity,
      totalPrice,
    });

    const massage = ` 
      Welcome to ShivCart, 
      Dear ${req.user.name},

      your order has been placed successfully.
      Order ID: ${order._id}
      Total Price: ${order.totalPrice}

      Thank you for choosing ShivCart.
      `;
    await sendMail(req.user.email, "Order placed", massage);
    return res.json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId: userId });
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status;
      await order.save();
      res.json({ message: "Order status updated successfully", order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
