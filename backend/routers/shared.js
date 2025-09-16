const express = require("express");
const router = express.Router();
const sharedController = require("../controllers/sharedController");
//under testing
router.patch("/change/passwrod", sharedController.changePassword);
router.patch("/change/name", sharedController.changeName);
router.patch("/change/phone", sharedController.changePhone);
router.patch("/change/email", sharedController.changeEmail);
module.exports = router;
