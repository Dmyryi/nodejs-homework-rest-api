const { Contact } = require("../models/contact");
const { updateContactsSchema } = require("../schemas/contactsSchemas");
const updateOne = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "Body must have at least one field",
      });
      return;
    }
    const { error } = updateContactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateOne;
