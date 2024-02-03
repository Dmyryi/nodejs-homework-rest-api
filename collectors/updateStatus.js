const { favoriteContactsSchema } = require("../schemas/contactsSchemas");
const { Contact } = require("../models/contact");
const updateStatusContacts = async (req, res) => {
  try {
    const { error } = favoriteContactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
      }
    );

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

module.exports = updateStatusContacts;
