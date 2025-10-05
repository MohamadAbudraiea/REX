const express = require("express");
const router = express.Router();
const sharedController = require("../controllers/sharedController");
const otpController = require("../controllers/otpController");
const ratingController = require("../controllers/ratingController");
//under testing
router.patch("/change/passwrod", sharedController.changePassword);
router.patch("/change/name", sharedController.changeName);
router.patch("/change/phone", sharedController.changePhone);
router.patch("/change/email", sharedController.changeEmail);
//--------------------------------------------------------------
router.post("/otp", otpController.sendOTP);
router.post("/otp/changepassword", otpController.changePassword);

//--------------------------------------------------------------
router.get("/ticket/all/ratings", ratingController.getRatingsWithTickets);
//--------------------------------------------------------------
router.get("/sendmessage", sharedController.sendMessage);
module.exports = router;
