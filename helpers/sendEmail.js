const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID_API } = process.env;

sgMail.setApiKey(SEND_GRID_API);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "muzalevskyid333@gmail.com" };
    await sgMail
      .send(email)
      .then(() => {
        console.log("email sent");
      })
      .catch((error) => {
        console.log(error);
      });
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
