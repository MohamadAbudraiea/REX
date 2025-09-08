const express = require("express");
const router = express.Router();
const sharedController = require("../controllers/shared");

router.get("/sayhi", sharedController.sayHi);

module.exports = router;
