const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user, ticket } = models;
const bcrypt = require("bcrypt");

exports.getAlldetailers = async (req, res) => {
  try {
    const detailers = await user.findAll({ where: { type: "detailer" } });
    res.status(200).json({
      status: "success",
      data: detailers,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "sth went wrong",
    });
  }
};
exports.getDetailerSchedule = async (req, res) => {
  try {
    const { detailer_id } = req.params;

    const detailerTickets = await ticket.findAll({
      where: {
        detailer_id: detailer_id,
        status: "pending",
      },
      attributes: ["id", "date", "start_time", "end_time"],
      order: [
        ["date", "ASC"],
        ["start_time", "ASC"],
      ],
    });

    const schedule = detailerTickets.map((t) => ({
      ticket_id: t.id,
      date: t.date,
      start: t.start_time,
      end: t.end_time,
      interval: `${t.start_time} - ${t.end_time}`,
    }));

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
