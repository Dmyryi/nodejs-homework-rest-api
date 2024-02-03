const { createContactsSchema } = require("../schemas/contactsSchemas");

const { Contact } = require("../models/contact");
const addOne = async (req, res, next) => {
  try {
    const { error } = createContactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      res.status(400).json({
        message: error.message,
      });
      throw error;
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addOne;
