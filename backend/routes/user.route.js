const express = require("express");
const router = express.Router();
const  protect  = require("../middleware");

const { registerUser, login, getProfile } = require("../controller/authController");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/profile", protect, getProfile);

module.exports = router;