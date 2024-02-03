const { Contact } = require("../models/contact");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);

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
