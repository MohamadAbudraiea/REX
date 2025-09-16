const SQL = require("../Drivers/SQL_Driver");
const initModels = require("../models/init-models");
const models = initModels(SQL);
const { user, OTP } = models;
const bcrypt = require("bcrypt");

function generateOTP() {
  const length = 6;
  const characters = "1234567890";
  let otp = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }
  return otp;
}
const htmlcontent = "hi";

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const existUser = await user.findOne({
      where: { email: email },
    });

    if (!existUser) {
      return res.status(404).json({
        status: "failed",
        message: "user not found",
      });
    }

    const otpContent = generateOTP();
    const otpRecord = OTP.create({
      code: otpContent,
      user_id: existUser.user_id,
      email: email,
    });
    // send the email here

    //
    res.status(201).json({
      status: "success",
      message: `OTP sent to ${existUser.email}`,
    });
    // delete otp
    setTimeout(async () => {
      await OTP.destroy({ where: { id: otpRecord.id } });
    }, 60 * 1000);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "sth went wrong",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword, otpCode } = req.body;
    const foundedOTP = await OTP.findOne({ where: { email: email } });
    if (!foundedOTP) {
      return res.status(404).json({
        status: "failed",
        message: "Your Code have been expired",
      });
    }

    if (foundedOTP.code == otpCode) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: newPassword }, { where: { email: email } });
      return res.status(201).json({
        status: "success",
        message: "Password have been changed",
      });
    } else {
      return res.status(404).json({
        status: "failed",
        message: "OTP is not matched",
      });
    }
  } catch (error) {}
};
