const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const admin = require("../middleware/adminMiddleware.js");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, admin, upload.single("image"), createProduct);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
