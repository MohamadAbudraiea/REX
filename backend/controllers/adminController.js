const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user, ticket } = models;
const bcrypt = require("bcrypt");

exports.testing = (req, res) => {
  console.log(req.user);
  res.status(200).json({
    data: req.user,
  });
};

exports.addUser = async (req, res) => {
  try {
    //type must be detailer or secretary
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
    const newUserData = newUser;
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
