const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require(cors);
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

// router imports
const sharedRouter = require("./routers/shared");

// routing
app.use("/shared", sharedRouter);
module.exports = app;
