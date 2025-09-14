const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user, ticket } = models;
const bcrypt = require("bcrypt");
// to make or in sequelize
const { Op } = require("sequelize");

exports.getUsers = async (req, res) => {
  try {
    const Users = await user.findAll({
      where: {
        [Op.or]: [{ type: "secretary" }, { type: "detailer" }],
      },
    });

    res.status(200).json({
      status: "success",
      data: Users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "sth went wrong",
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    //type mSust be detailer or secretary
    const { name, email, phone, password, type } = req.body;
    if (type === "admin" || type === "user") {
      return res.status(400).json({
        message: "your'e not allowed to add this type",
      });
    }
    hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      type: type,
    });
    const newUserData = newUser.toJSON();
    delete newUserData.password; // to send the response without password:)
    res.status(201).json({
      status: "sucsess",
      data: newUserData,
      message: `${newUserData.name} added as ${newUserData.type} successfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedUser = await user.destroy({
      where: { id: id },
    });

    console.log(deletedUser);

    res.status(202).json({
      status: "success",
      message: "user deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "sth went wrong",
    });
  }
};
