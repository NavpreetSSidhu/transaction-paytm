const zod = require("zod");

const schemaValidationSignup = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const schemaValidationLogin = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const schemaValidationUpdate = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const validateSignUpInput = async (req, res, next) => {
  try {
    const { success } = schemaValidationSignup.safeParse(req.body);
    if (success) {
      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const validateLoginInput = async (req, res, next) => {
  try {
    const { success } = schemaValidationLogin.safeParse(req.body);
    if (success) {
      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const validateUpdateInput = async (req, res, next) => {
  try {
    const { success } = schemaValidationUpdate.safeParse(req.body);
    if (success) {
      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  validateSignUpInput,
  validateLoginInput,
  validateUpdateInput,
};
