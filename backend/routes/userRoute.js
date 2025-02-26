const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, getUser, getLoginStatus, updateUser, updatePhoto } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/getloginstatus", getLoginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/updatephoto", protect, updatePhoto);

module.exports= router;