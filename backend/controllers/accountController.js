const { default: mongoose } = require("mongoose");
const { Account } = require("../models/account");

const getBalance = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        messsage: "userid is required",
      });
    }

    const account = await Account.findOne({ userId });
    if (!account) {
      return res.status(404).json({
        success: false,
        messsage: "this user does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "balance fetched successfully",
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const transferMoney = async (req, res) => {
  try {
    // start session
    const session = await mongoose.startSession();
    session.startTransaction();
    const { to, amount } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        messsage: "userid is required",
      });
    }

    const account = await Account.findOne({ userId }).session(session);
    if (!account) {
      // abort session
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        messsage: "this user does not exist",
      });
    }
    if (account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        messsage: "Insufficient balance",
      });
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        messsage: "this account does not exist",
      });
    }
    // perform transfer
    await Account.updateOne({ userId }, { $inc: { balance: -amount } }).session(
      session
    );
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);
    // commit session
    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Transfer successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getBalance,
  transferMoney,
};
