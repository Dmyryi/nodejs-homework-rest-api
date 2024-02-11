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
const { auth } = require("../../middlewars/auth");

router.get("/", auth, getAll);

router.get("/:id", isValidId, getById);

router.post("/", auth, addOne);

router.delete("/:id", isValidId, deleteOne);

router.put("/:id", isValidId, updateOne);

router.patch("/:id/favorite", isValidId, updateStatus);

module.exports = router;
