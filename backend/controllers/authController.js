const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//------------------------------------------
const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user } = models;
//------------------------------------------
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({
        status: "failed",
        message: "please enter full data",
      });
    // check if the email format is correct
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email format",
      });
    }

    const findUser = await user.findOne({
      where: { email: email.trim().toLowerCase() },
    });
    if (findUser) {
      const validPassword = bcrypt.compare(password, findUser.password);
      if (!validPassword) {
        return res.status(400).json({
          status: "fail",
          message: "wrong email or password",
        });
      }
    } else {
      return res.status(400).json({
        status: "fail",
        message: "wrong email or password",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
