const express = require("express");
const { register } = require("../../collectors/register");
const { getCurrent } = require("../../collectors/getCurrent");
const router = express.Router();
const { auth } = require("../../middlewars/auth");
const { login } = require("../../collectors/login");
const { logout } = require("../../collectors/logout");

router.post("/register", register);
router.post("/login", login);
router.get("/current", auth, getCurrent);
router.post("/logout", auth, logout);

module.exports = router;