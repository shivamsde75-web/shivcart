const cloudinary = require("../config/cloudinary");
const product = require("../model/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const products = await product.findById(productId);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, status } = req.body;

    let imageURL = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageURL = result.secure_url;
    }

    const newProduct = await product.create({
      name,
      price: Number(price),
      description,
      category,
      stock: Number(stock),
      status: status === "inactive" ? "inactive" : "active",
      imageURL,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, status } = req.body;
    const productId = req.params.id;
    const foundProduct = await product.findById(productId);

    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    foundProduct.name = name || foundProduct.name;
    foundProduct.price = Number(price) || foundProduct.price;
    foundProduct.description = description || foundProduct.description;
    foundProduct.category = category || foundProduct.category;
    foundProduct.stock = Number(stock) || foundProduct.stock;
    foundProduct.status = status === "inactive" ? "inactive" : "active";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      foundProduct.imageURL = result.secure_url;
    }

    await foundProduct.save();
    return res.status(200).json(foundProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
