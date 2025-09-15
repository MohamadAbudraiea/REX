const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const ticketController = require("../controllers/ticketController");
// to get all the secretaries and detailers
router.get("/user", adminController.getUsers);
// the user can be secretary or detailer just
router.post("/user", adminController.addUser);
// to delete users(shouldn't validate)
router.delete("/user", adminController.deleteUser);
//-------------------------------------------------
//tickets
router.post("/ticket/accept/:ticket_id", ticketController.acceptTicket);
router.post("/ticket/cancel/:ticket_id", ticketController.cancelticket);

module.exports = router;
