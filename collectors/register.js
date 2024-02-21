const { usersSchema } = require("../schemas/usersSchema");
const { User } = require("../models/user");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const { sendEmail } = require("../helpers/sendEmail");

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

    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const verificationToken = uuidv4();

    const result = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Підтвердження реєстрації",
      html: "<a href=`http://localhost:3000/users/verify/${verificationToken}` target=`_blank`>Нажміть для підтвердження</a>",
    };
    await sendEmail(mail);
    res.status(201).json({
      user: {
        email,
        subscription: result.subscription,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
