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
      const validPassword = await bcrypt.compare(password, findUser.password);
      if (!validPassword) {
        return res.status(400).json({
          status: "fail",
          message: "wrong email or password",
        });
      }
      // sign jwt
      const token = jwt.sign(
        {
          id: findUser.id,
          role: findUser.type,
          email: findUser.email,
          phone: findUser.phone,
          name: findUser.name,
        },
        process.env.JWT_SECRET
      );
      // cookie response
      const cook = res.cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development", // true in prod, false in dev
        maxAge: 1000 * 60 * 60 * 2, // 120 minutes
      });
      //user data
      req.user = {
        id: findUser.id,
        email: findUser.email,
        phone: findUser.phone,
      };
      console.log(req.user);

      //response
      const userData = findUser.toJSON();
      delete userData.password; // to send the response without password:)
      res.status(200).json({
        status: "success",
        data: userData,
        message: "logged in successfully",
      });
    } else {
      return res.status(400).json({
        status: "fail",
        message: "wrong email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};
exports.userSignup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        status: "failed",
        message: "please enter the full data",
      });
    }

    // check if the email format is correct
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email format",
      });
    }
    //--------------------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      type: "user",
    });

    res.status(201).json({
      status: "success",
      data: newUser,
      message: "signed up successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
// User logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  try {
    return res.json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    res.send(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

exports.check = (req, res) => {
  try {
    if (!req.user)
      return res.status(403).json({
        status: "failed",
        message: "unauthnticated",
      });
    else
      return res.status(200).json({
        status: "success",
        data: req.user,
      });
  } catch (error) {
    res.send(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};
