const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLegth: 30,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLegth: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLegth: 30,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
