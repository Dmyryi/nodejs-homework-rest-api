const express = require("express");

const router = express.Router();
const contactsOperation = require("../../models/contacts");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperation.getContactById(id);
    if (!result) {
      res.status(404).json({
        message: "Not found",
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      res.status(400).json({
        message: error.message,
      });
      throw error;
    }
    const result = await contactsOperation.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperation.removeContact(id);
    if (!result) {
      res.status(404).json({
        message: "Not found",
      });
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "Body must have at least one field",
      });
      return;
    }
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }

    const { id } = req.params;
    const result = await contactsOperation.updateContact(id, req.body);

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
});

module.exports = router;
