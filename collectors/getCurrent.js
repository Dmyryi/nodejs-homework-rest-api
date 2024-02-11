const { User } = require("../models/user");

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  try {
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCurrent };
