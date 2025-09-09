const express = require("express");
const jwt = require("jsonwebtoken");
//------------------------------------------
const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user } = models;
//------------------------------------------
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.session;
    console.log(token);
    if (!token) {
      return res.status(200);
    }
    next();
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: "user unauthinticated",
    });
  }
};

module.exports = authenticateUser;
