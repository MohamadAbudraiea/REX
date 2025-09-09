const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/testing", adminController.testing);
module.exports = router;
