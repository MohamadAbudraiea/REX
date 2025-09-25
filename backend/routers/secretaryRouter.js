const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const detailerController = require("../controllers/detailerController.js");
// get tickets then get schedules
router.get("/ticket/requested", ticketController.getRequestedTickets);
router.get("/tickets/pending", ticketController.getPendingTickets);
router.get("/tickets/finished", ticketController.getFinishedTickets);

router.get("/ticket/:ticket_id", ticketController.getTicketByID);
//get rating
router.get("/ticket/rating/:ticket_id", ratingController.getTicketRating);
//-------------------------
// use this (in admin we get all the secretaries and detailers here we get just the detailers)
router.get("/detailer", detailerController.getAlldetailers);

router.get("/detailer/:detailer_id", detailerController.getDetailerSchedule);
router.get(
  "/detailer/:detailer_id/:date",
  detailerController.getDetailerScheduleByDate
);
//--------------------------------------------------------------
// accept ticket or cancel it
router.post("/ticket/accept/:ticket_id", ticketController.acceptTicket);
router.post("/ticket/cancel/:ticket_id", ticketController.cancelticket);
//---------------------------------------------------------------

module.exports = router;
