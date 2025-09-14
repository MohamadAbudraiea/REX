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
// review
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      order: [["status", "ASC"]],
      include: {
        model: user,
        attributes: ["name", "phone"],
      },
    });

    res.status(200).json({
      status: "success",
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
exports.getRequestedTickets = async (req, res) => {
  try {
    const reqTickets = await ticket.findAll({
      where: { status: "requested" },
      include: {
        model: user,
        attributes: ["name", "phone"],
      },
    });

    res.status(200).json({
      status: "success",
      data: reqTickets,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
exports.getPendingTickets = async (req, res) => {
  try {
    var pendingTickets;
    if (req.user.role === "secretary") {
      // secretary
      pendingTickets = await ticket.findAll({
        where: { status: "pending", secretary_id: req.user.id },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "detailer") {
      // detailer
      pendingTickets = await ticket.findAll({
        where: { status: "pending", detailer_id: req.user.id },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "user") {
      pendingTickets = await ticket.findAll({
        where: { status: "pending", user_id: req.user_id },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    } else {
      // admin

      pendingTickets = await ticket.findAll({
        where: { status: "pending" },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    }

    res.status(200).json({
      status: "success",
      data: pendingTickets,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
exports.getFinishedTickets = async (req, res) => {
  try {
    var finishedTickets;
    if (req.user.role === "secretary") {
      // secretary
      finishedTickets = await ticket.findAll({
        where: { status: "finished", secretary_id: req.user.id },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "detailer") {
      // detailer
      finishedTickets = await ticket.findAll({
        where: { status: "finished", detailer_id: req.user.id },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "user") {
      finishedTickets = await ticket.findAll({
        where: { status: "finished", user_id: req.user_id },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    } else {
      // admin

      finishedTickets = await ticket.findAll({
        where: { status: "finished" },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    }

    res.status(200).json({
      status: "success",
      data: finishedTickets,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
exports.getCanceldTickets = async (req, res) => {
  try {
    var canceledTickets;
    if (req.user.role === "secretary") {
      // secretary
      canceledTickets = await ticket.findAll({
        where: { status: "canceled", secretary_id: req.user.id },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "detailer") {
      // detailer
      canceledTickets = await ticket.findAll({
        where: { status: "canceled", detailer_id: req.user.id },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "user") {
      canceledTickets = await ticket.findAll({
        where: { status: "canceled", user_id: req.user_id },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    } else {
      // admin

      canceledTickets = await ticket.findAll({
        where: { status: "canceled" },
        include: {
          model: user,
          attributes: ["name", "phone"],
        },
      });
    }

    res.status(200).json({
      status: "success",
      data: canceledTickets,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
