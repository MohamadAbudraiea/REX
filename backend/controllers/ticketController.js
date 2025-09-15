const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user, ticket, rating } = models;
const bcrypt = require("bcrypt");

exports.addticket = async (req, res) => {
  try {
    const { date, service, location } = req.body;
    const user_id = req.user.id;
    const status = "requested";
    const newTicket = await ticket.create({
      user_id: user_id,
      date: date,
      service: service,
      location,
      status: status,
    });

    res.status(201).json({
      status: "success",
      data: newTicket,
      message: "Your Order have been requested",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// getTickets all and based on their status
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      order: [["status", "ASC"]],
      include: {
        model: user,
        as: "user",
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
        as: "user",
        attributes: ["name", "phone"],
      },
      include: {
        model: user,
        as: "secretary",
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
          as: "user",
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "detailer") {
      // detailer
      pendingTickets = await ticket.findAll({
        where: { status: "pending", detailer_id: req.user.id },
        include: {
          model: user,
          as: "user",
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "user") {
      pendingTickets = await ticket.findAll({
        where: { status: "pending", user_id: req.user_id },
        include: {
          model: user,
          as: "user",
          attributes: ["name", "phone"],
        },
      });
    } else {
      // admin

      pendingTickets = await ticket.findAll({
        where: { status: "pending" },
        include: {
          model: user,
          as: "user",
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
          as: "user",
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "detailer") {
      // detailer
      finishedTickets = await ticket.findAll({
        where: { status: "finished", detailer_id: req.user.id },
        include: {
          model: user,
          as: "user",
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "user") {
      finishedTickets = await ticket.findAll({
        where: { status: "finished", user_id: req.user_id },
        include: {
          model: user,
          as: "user",
          attributes: ["name", "phone"],
        },
      });
    } else {
      // admin

      finishedTickets = await ticket.findAll({
        where: { status: "finished" },
        include: {
          model: user,
          as: "user",
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
          as: "user",
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "detailer") {
      // detailer
      canceledTickets = await ticket.findAll({
        where: { status: "canceled", detailer_id: req.user.id },
        include: {
          model: user,
          as: "user",
          attributes: ["name", "phone"],
        },
      });
    } else if (req.user.role === "user") {
      canceledTickets = await ticket.findAll({
        where: { status: "canceled", user_id: req.user_id },
        include: {
          model: user,
          as: "user",
          attributes: ["name", "phone"],
        },
      });
    } else {
      // admin

      canceledTickets = await ticket.findAll({
        where: { status: "canceled" },
        include: {
          model: user,
          as: "user",
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

// change status functionalites
exports.acceptTicket = async (req, res) => {
  try {
    const { date, location, start_time, end_time, price, detailer_id } =
      req.body;
    const { ticket_id } = req.params;

    await ticket.update(
      {
        status: "pending",
        secretary_id: req.user.id,
        detailer_id: detailer_id,
        date: date,
        location: location,
        start_time: start_time,
        end_time: end_time,
        price: price,
      },
      {
        where: { id: ticket_id },
      }
    );

    res.status(201).json({
      status: "success",
      message: "order has been accepted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
exports.cancelticket = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    console.log(ticket_id);
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
    res.status(201).json({
      status: "success",
      message: "Your Order has been canceled ",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
exports.finishTicket = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const updatedTicket = await ticket.update(
      {
        where: { id: ticket_id },
      },
      { status: "finished" }
    );
    res.status(201).json({
      status: "success",
      message: "the order has finished",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
