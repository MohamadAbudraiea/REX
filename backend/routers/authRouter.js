const express = require("express");
const router = express.Router();
const sharedController = require("../controllers/shared");
const authController = require("../controllers/authController");
//--------------------------------------------
router.post("/login", authController.userLogin);
router.post("/signup", authController.userSignup);
router.post("/logout", authController.logout);
//--------------------------------------------

module.exports = router;
