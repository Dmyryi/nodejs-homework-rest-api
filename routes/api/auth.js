const express = require("express");
const { register } = require("../../collectors/register");
const { getCurrent } = require("../../collectors/getCurrent");
const router = express.Router();
const { auth } = require("../../middlewars/auth");
const { login } = require("../../collectors/login");
const { logout } = require("../../collectors/logout");
const { avatarPatch } = require("../../collectors/avatarPatch");
const { upload } = require("../../middlewars/upload");
const { verifyEmail } = require("../../collectors/verifyEmail");
const { verifySend } = require("../../collectors/verifySend");

router.post("/register", register);
router.post("/login", login);
router.get("/current", auth, getCurrent);
router.post("/logout", auth, logout);
router.patch("/avatars", auth, upload.single("avatar"), avatarPatch);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", verifySend);

module.exports = router;
