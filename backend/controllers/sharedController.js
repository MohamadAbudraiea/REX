const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user } = models;
const bcrypt = require("bcrypt");

exports.changePassword = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const existUser = await user.findOne({ where: { id: user_id } });
    if (!existUser) {
      return res.status(400).json({
        status: "failed",
        message: "user not found",
      });
    }
    const validPassword = await bcrypt.compare(oldPassword, existUser.password);
    if (!validPassword) {
      return res.status(400).json({
        status: "failed",
        message: "wrong password",
      });
    }
    // hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // update user
    await user.update(
      { password: hashedNewPassword },
      { where: { id: user_id } }
    );

    return res.status(200).json({
      status: "success",
      message: "password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "sth went wrong",
    });
  }
};
exports.changePhone = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { phone, oldPassword } = req.body;

    if (!phone || !oldPassword) {
      return res.status(400).json({
        status: "failed",
        message: "phone and password are required",
      });
    }

    const existUser = await user.findOne({ where: { id: user_id } });
    if (!existUser) {
      return res
        .status(404)
        .json({ status: "failed", message: "user not found" });
    }

    const validPassword = await bcrypt.compare(oldPassword, existUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ status: "failed", message: "wrong password" });
    }

    await user.update({ phone: phone }, { where: { id: user_id } });

    return res.status(200).json({
      status: "success",
      message: "phone updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "something went wrong",
    });
  }
};

exports.changeEmail = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { email, oldPassword } = req.body;

    if (!email || !oldPassword) {
      return res.status(400).json({
        status: "failed",
        message: "email and password are required",
      });
    }

    const existUser = await user.findOne({ where: { id: user_id } });
    if (!existUser) {
      return res
        .status(404)
        .json({ status: "failed", message: "user not found" });
    }

    const validPassword = await bcrypt.compare(oldPassword, existUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ status: "failed", message: "wrong password" });
    }

    await user.update({ email: email }, { where: { id: user_id } });

    return res.status(200).json({
      status: "success",
      message: "email updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "something went wrong",
    });
  }
};

exports.changeName = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { name, oldPassword } = req.body;

    if (!name || !oldPassword) {
      return res.status(400).json({
        status: "failed",
        message: "name and password are required",
      });
    }

    const existUser = await user.findOne({ where: { id: user_id } });
    if (!existUser) {
      return res
        .status(404)
        .json({ status: "failed", message: "user not found" });
    }

    const validPassword = await bcrypt.compare(oldPassword, existUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ status: "failed", message: "wrong password" });
    }

    await user.update({ name: name }, { where: { id: user_id } });

    return res.status(200).json({
      status: "success",
      message: "name updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "something went wrong",
    });
  }
};
