const { usersSchema } = require("../schemas/usersSchema");
const { User } = require("../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) {
      error.status = 400;
      res.status(400).json({
        message: error.message,
      });
      throw error;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email in use`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ email, password: hashPassword });
    console.log(result);
    res.status(201).json({
      user: {
        email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
