const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user, ticket, rating } = models;
const bcrypt = require("bcrypt");

exports.addticket = async (req, res) => {
  try {
    const { user_id, date, service, location } = req.body;
    const status = "requested";
    const newTicket = await ticket.create({
      user_id: user_id,
      date: date,
      service: service,
      location,
      status: status,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.cancelticket = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { cancel_reason } = req.body;
    const status = "canceled";
    const updatedTicket = await ticket.update(
      {
        status: status,
        cancel_reason: cancel_reason,
      },
      {
        where: { id: ticket_id },
      }
    );
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.rateticket = async (req, res) => {
  try {
    const { ticket_id, rating_number, description } = req.body;
    const findTicket = await ticket.findOne({
      where: { id: ticket_id },
    });
    if (!findTicket || findTicket.status !== "finished")
      return res.status(204).json({
        status: "failed",
        message: "the token is not finished",
      });
    if (rating_number > 5 || rating_number < 0) {
      return res.status(204).json({
        status: "failed",
        message: "wrong input",
      });
    }

    const newRating = await rating.create({
      ticket_id: ticket_id,
      user_id: findTicket.user_id,
      rating_number: rating_number,
      description: description,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
