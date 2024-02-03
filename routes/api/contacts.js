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

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", addOne);

router.delete("/:id", deleteOne);

router.put("/:id", updateOne);

router.patch("/:id/favorite", updateStatus);

module.exports = router;
