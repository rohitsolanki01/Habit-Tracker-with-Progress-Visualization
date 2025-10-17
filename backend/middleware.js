const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");

const protect = async (req, res, next) => {
  let token;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Invalid token");
    }

    token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch ({ message }) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = protect;