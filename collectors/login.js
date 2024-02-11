const { usersSchema } = require("../schemas/usersSchema");
const { User } = require("../models/user");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
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
    if (!user) {
      throw new Unauthorized("Email or password is wrong!");
    }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
      throw new Unauthorized("Email or password is wrong!");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
    const result = await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { login };
