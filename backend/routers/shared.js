const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");
const ratingController = require("../controllers/ratingController");
//--------------------------------------------------------------
router.post("/otp", otpController.sendOTP);
router.post("/otp/changepassword", otpController.changePassword);

//--------------------------------------------------------------
router.get("/ticket/all/ratings", ratingController.getRatingsWithTickets);
//--------------------------------------------------------------
router.get("/sendmessage", sharedController.sendMessage);
module.exports = router;
