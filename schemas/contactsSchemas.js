const Joi = require("joi");
const updateContactsSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number().strict(true),
}).min(1);

const createContactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().strict(true).required(),
});

module.exports = { createContactsSchema, updateContactsSchema };
