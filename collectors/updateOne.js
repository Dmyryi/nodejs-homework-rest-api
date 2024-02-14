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
    const { _id } = req.user;
    const result = await Contact.findOneAndUpdate(
      { _id: id, owner: _id },
      req.body,
      { new: true }
    ).populate("owner", "_id email");

    if (result.owner._id.toString() !== _id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to access this contact",
      });
    }

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
