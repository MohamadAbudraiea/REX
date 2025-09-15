const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.post("/ticket", ticketController.addticket);
// in the front make  a confirmation message , and the ticket
// can be canceled if and only if the ticket is still requested
router.post("/ticket/cancel/:ticket_id", ticketController.cancelticket);
module.exports = router;
