const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user, ticket } = models;
const bcrypt = require("bcrypt");

// Helper function to format tickets for frontend
const formatSchedule = (tickets) =>
  tickets.map((t) => ({
    ticket_id: t.id,
    date: t.date,
    start: t.date + "T" + t.start_time, // ISO format for frontend
    end: t.date + "T" + t.end_time,
    interval: `${t.start_time} - ${t.end_time}`,
  }));

// Get all detailers
exports.getAlldetailers = async (req, res) => {
  try {
    const detailers = await user.findAll({
      where: { type: "detailer" },
      attributes: ["id", "name", "email", "phone"], // exclude sensitive fields
    });

    res.status(200).json({
      status: "success",
      data: detailers,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

// Get all pending tickets for a detailer (all dates)
exports.getDetailerSchedule = async (req, res) => {
  try {
    const { detailer_id } = req.params;

    const detailerTickets = await ticket.findAll({
      where: { detailer_id, status: "pending" },
      attributes: ["id", "date", "start_time", "end_time"],
      order: [
        ["date", "ASC"],
        ["start_time", "ASC"],
      ],
    });

    const schedule = formatSchedule(detailerTickets);

    return res.status(200).json({
      status: "success",
      detailer_id,
      schedule,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};

// Get pending tickets for a detailer on a specific date
exports.getDetailerScheduleByDate = async (req, res) => {
  try {
    const { detailer_id, date } = req.params;

    const detailerTickets = await ticket.findAll({
      where: { detailer_id, date, status: "pending" },
      attributes: ["id", "date", "start_time", "end_time"],
      order: [["start_time", "ASC"]], // date ordering not needed
    });

    const schedule = formatSchedule(detailerTickets);

    return res.status(200).json({
      status: "success",
      detailer_id,
      schedule,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};
