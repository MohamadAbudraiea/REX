const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const detailerController = require("../controllers/detailerController.js");
// get tickets
router.get("/tickets/pending", ticketController.getPendingTickets);
router.get("/tickets/finished", ticketController.getFinishedTickets);
router.post("/ticket/finish/:ticket_id", ticketController.finishTicket);

//get rating
router.get("/ticket/rating/:ticket_id", ratingController.getTicketRating);
module.exports = router;
