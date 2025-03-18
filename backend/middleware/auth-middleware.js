const jwt = require("jsonwebtoken");

// ✅ Fix spelling mistake: `authMiddleware`
const authMiddleware = (req, res, next) => {
  console.log("Auth Middleware");

  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded);

    req.userInfo = decoded; // ✅ Attach user info
    next();
  } catch (err) {
    console.log("JWT Verification Error:", err);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ✅ Fix `checkAdmin` to correctly check role
const checkAdmin = (req, res, next) => {
  console.log("Check Admin Middleware");
  console.log("User Info:", req.userInfo); // Debugging log

  if (!req.userInfo) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No user info found",
    });
  }

  if (req.userInfo.role !== "admin") { // ✅ Correct property
    return res.status(403).json({
      success: false,
      message: "Access Denied: Admins only",
    });
  }

  next();
};

module.exports = { authMiddleware, checkAdmin };
