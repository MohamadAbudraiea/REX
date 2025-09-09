const express = require("express");
const router = express.Router();
const sharedController = require("../controllers/shared");
const authController = require("../controllers/authController");
const authUser = require("../middlewares/authentication");
const authenticateUser = require("../middlewares/authentication");
//--------------------------------------------
router.post("/login", authController.userLogin);
router.post("/signup", authController.userSignup);
router.post("/logout", authController.logout);
//--------------------------------------------
router.get("/check", authenticateUser, authController.check);
module.exports = router;
