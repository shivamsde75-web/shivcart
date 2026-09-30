const jwt = require("jsonwebtoken");
const User = require("../model/user.js");

const protect = async (req, res, next) => {
  const token= req.cookies.token;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (!user) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  const foundUser = await User.findById(user.id);
  if (!foundUser) {
    return res.status(401).json({ message: "Not authorized, user not found" });
  }
  req.user = foundUser;
  next();
}

module.exports = protect;