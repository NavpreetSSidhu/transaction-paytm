const express = require("express");
const {
  validateSignUpInput,
  validateLoginInput,
  validateUpdateInput,
} = require("../middlewares/validation");
const {
  userSignUp,
  userSignIn,
  updateUserInfo,
  getUsersInBulk,
} = require("../controllers/authController");
const { authorizeMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", validateSignUpInput, userSignUp);
router.post("/signin", validateLoginInput, userSignIn);
router.put("/", authorizeMiddleware, validateUpdateInput, updateUserInfo);
router.get("/bulk", getUsersInBulk);

module.exports = router;
