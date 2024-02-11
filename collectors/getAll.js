const { Contact } = require("../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const contacts = await Contact.find({ owner: _id }).populate(
      "owner",
      "_id email"
    );
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
module.exports = getAll;
