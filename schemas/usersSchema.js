const Joi = require("joi");

const usersSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});

module.exports = {
  usersSchema,
};
