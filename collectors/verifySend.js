const verifySchema = require("../schemas/verifySchemas");
const { User } = require("../models/user");
const sendEmail = require("../helpers/sendEmail");

const verifySend = async (res, req) => {
  const { error } = verifySchema.validate(req.body);
  if (error) {
    error.status = 400;
    res.status(400).json({
      message: error.message,
    });
    throw error;
  }
  const { email } = req.body;
  const user = await User.findOne({});
  if (!user) {
    res.status(404).json({
      message: "Not found",
    });
  }
  if (user.verify) {
    res.status(400).json({
      message: "User already verify",
    });
  }
  const mail = {
    to: email,
    subject: "Підтвердження реєстрації",
    html: "<a href=`http://localhost:3000/users/verify/${user.verificationToken}` target=`_blank`>Нажміть для підтвердження</a>",
  };
  await sendEmail(mail);
  res.json({
    message: "Email verify resend",
  });
};

module.exports = { verifySend };
