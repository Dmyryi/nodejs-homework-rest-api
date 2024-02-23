const { verifySchema } = require("../schemas/verifySchemas");
const { User } = require("../models/user");
const { sendEmail } = require("../helpers/sendEmail");

const verifySend = async (req, res, next) => {
  try {
    const { error } = verifySchema.validate(req.body);
    if (error) {
      error.status = 400;
      res.status(400).json({
        message: error.message,
      });
      return;
    }

    const user = await User.findOne(req.body);
    if (!user) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    if (user.verify) {
      res.status(400).json({
        message: "User already verify",
      });
      return;
    }
    const mail = {
      to: req.body,
      subject: "Підтвердження реєстрації",
      html: "<a href=`http://localhost:3000/users/verify/${user.verificationToken}` target=`_blank`>Нажміть для підтвердження</a>",
    };
    await sendEmail(mail);
    res.json({
      message: "Email verify resend",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { verifySend };
