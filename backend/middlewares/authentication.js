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
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: "user unauthinticated",
    });
  }
};
