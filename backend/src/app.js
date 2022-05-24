const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user-routes");
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", userRoutes);

process
  .on("unhandledRejection", (err, promise) => {
    console.error(err, "Unhandled rejection at promise: ", promise);
  })
  .on("uncaughtException", (err) => {
    console.error("Uncaught exception: ", err);
    process.exit(1);
  });

module.exports = app;
