const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authorizeMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(403).json({
      success: false,
      message: "missing auth token",
    });
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.userId = decoded.user_name;

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "missing auth token",
    });
  }
};

module.exports = { authorizeMiddleware };
