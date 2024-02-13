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

router.get("/:id", auth, isValidId, getById);

router.post("/", auth, addOne);

router.delete("/:id", auth, isValidId, deleteOne);

router.put("/:id", auth, isValidId, updateOne);

router.patch("/:id/favorite", auth, isValidId, updateStatus);

module.exports = router;
