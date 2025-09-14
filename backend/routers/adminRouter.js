const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// to get all the secretaries and detailers
router.get("/user", adminController.getUsers);
// the user can be secretary or detailer just
router.post("/user", adminController.addUser);
// to delete users(shouldn't validate)
router.delete("/user", adminController.deleteUser);

module.exports = router;
