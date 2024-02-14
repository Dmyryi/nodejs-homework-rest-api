const { Contact } = require("../models/contact");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const result = await Contact.findOne({ _id: id, owner: _id }).populate(
      "owner",
      "_id email"
    );

    if (result.owner._id.toString() !== _id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to access this contact",
      });
    }

    if (!result) {
      res.status(404).json({
        message: "Not found",
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
