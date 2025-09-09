const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
//-----------------------------------------
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// authentication // autharization
const authenticateUser = require("./middlewares/authentication");
// router imports
const authRouter = require("./routers/authRouter");
const adminRouter = require("./routers/adminRouter");
// routing
app.use("/auth", authRouter);
app.use("/admin", authenticateUser, adminRouter);
module.exports = app;
