const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "../images")));
app.use("/api/auth", userRoutes);
app.use("/api", postRoutes);

process
  .on("unhandledRejection", (err, promise) => {
    console.error(err, "Unhandled rejection at promise: ", promise);
  })
  .on("uncaughtException", (err) => {
    console.error("Uncaught exception: ", err);
    process.exit(1);
  });

module.exports = app;
