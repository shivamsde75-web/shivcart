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
    const { name, price, description, category, stock } = req.body;

    let imageURL = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);

      imageURL = result.secure_url;
    }
    const newProduct = await product.create({
      name,
      price,
      description,
      category,
      stock,
      imageURL,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const productId = req.params.id;
    const Product = await product.findByIdAndUpdate(productId);
    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }
    Product.name = name || Product.name;
    Product.price = price || Product.price;
    Product.description = description || Product.description;
    Product.category = category || Product.category;
    Product.stock = stock || Product.stock;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedProduct.imageURL = result.secure_url;
    }

    await Product.save();
    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
