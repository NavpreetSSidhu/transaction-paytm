const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  } catch (error) {
    console.log(error.message);
  }
};

const comparePassword = async (password, hashPassword) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
