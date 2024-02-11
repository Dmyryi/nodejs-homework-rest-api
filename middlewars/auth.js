const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new Unauthorized("Not authorized");
    }

    try {
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw new Unauthorized("Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.message === "Invalid signature") {
        error.status = 401;
      }
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
