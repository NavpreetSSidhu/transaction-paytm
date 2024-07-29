const express = require("express");
const {
  getBalance,
  transferMoney,
} = require("../controllers/accountController");
const { authorizeMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/balance", authorizeMiddleware, getBalance);

router.post("/transfer", authorizeMiddleware, transferMoney);

module.exports = router;
