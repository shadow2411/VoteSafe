const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "xxxxxxxx",
  api_key: "xxxxxxxxxxxxxx",
  api_secret: "xxxxxxxxxxxxxxxxxxxxxxxxx",
  secure: true,
});

router.post("/register", registerController.registerController);
module.exports = router;
