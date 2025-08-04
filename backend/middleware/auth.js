require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("Extracted token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (err) {
      console.log("Invalid token");
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      });
    }

    next();
  } catch (err) {
    console.error("Middleware error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

