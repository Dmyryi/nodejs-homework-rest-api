const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addOne,
  deleteOne,
  updateOne,
  updateStatus,
} = require("../../collectors");
const isValidId = require("../../middlewars/isValid");

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", addOne);

router.delete("/:id", isValidId, deleteOne);

router.put("/:id", isValidId, updateOne);

router.patch("/:id/favorite", isValidId, updateStatus);

module.exports = router;
