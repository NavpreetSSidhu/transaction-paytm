const express = require("express");
const userRouter = require("./userRoutes");
const accountRouter = require("./accountsRoutes");

const router = express.Router();

router.use("/user", userRouter);
router.use("/accounts", accountRouter);
module.exports = router;
