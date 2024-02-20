const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models/user");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const avatarPatch = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  console.log(req.file);

  const { path: tempUpload, originalname } = req.file;

  try {
    const resultUpload = path.join(avatarsDir, originalname);

    await jimp.read(tempUpload).then((img) => {
      return img.resize(250, 250).write(tempUpload);
    });

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", originalname);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = { avatarPatch };
