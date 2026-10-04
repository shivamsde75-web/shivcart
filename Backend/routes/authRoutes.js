const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  logoutUser,
  me,
} = require("../controllers/authController.js");
const protect = require("../middleware/authMiddleware.js");
const admin = require("../middleware/adminMiddleware.js");

// Admin middleware to check if the user is an admin

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users", protect, admin, getAllUsers);
router.get("/me", protect, me);

module.exports = router;
