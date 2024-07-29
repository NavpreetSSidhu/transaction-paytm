const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const generateToken = (userId) => {
  return jwt.sign(
    {
      user_name: userId,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = {
  generateToken,
};
