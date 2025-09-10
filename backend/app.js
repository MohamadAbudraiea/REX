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
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// authentication // autharization
const authenticateUser = require("./middlewares/authentication");
const autharizationMiddleware = require("./middlewares/authorization");
// router imports
const authRouter = require("./routers/authRouter");
const adminRouter = require("./routers/adminRouter");
// routing
app.use("/auth", authRouter);
// authinticate then authorize then enter the router
app.use(
  "/admin",
  authenticateUser,
  autharizationMiddleware.authorizeAdmin,
  adminRouter
);

module.exports = app;
