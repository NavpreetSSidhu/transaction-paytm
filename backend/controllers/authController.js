const { hashPassword, comparePassword } = require("../helpers/authHelper");
const { generateToken } = require("../helpers/tokenHelper");
const { Account } = require("../models/account");
const User = require("../models/user");

const userSignUp = async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body;
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }
    if (!firstName) {
      return res.status(400).json({
        success: false,
        message: "Firstname is required",
      });
    }
    if (!lastName) {
      return res.status(400).json({
        success: false,
        message: "Lastname is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(411).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPass = await hashPassword(password);

    const newUser = await User.create({
      username,
      firstName,
      lastName,
      password: hashPass,
    });

    const newUserId = newUser._id;
    let balance = Math.floor(Math.random() * 1000) + 1;
    await Account.create({
      userId: newUserId,
      balance,
    });

    const token = generateToken(newUserId);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      token,
      balance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Input the required fields",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      message: "Login successfull",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        messsage: "userid is required",
      });
    }
    const user = await User.findOne({ _id: userId });

    const hashPass = await hashPassword(password);
    const updates = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    updates.password = hashPass;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    await User.updateOne(
      { _id: userId },
      {
        $set: updates,
      }
    );

    res.status(200).json({
      success: true,
      message: "user info update successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsersInBulk = async (req, res) => {
  try {
    const { filter } = req.query || "";
    // if (!filter) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "missing params",
    //   });
    // }

    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    const result = users.map(({ username, firstName, lastName, _id }) => ({
      username,
      firstName,
      lastName,
      _id,
    }));

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      result,
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
  userSignUp,
  userSignIn,
  updateUserInfo,
  getUsersInBulk,
};
