const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./services/database");
const userRoutes = require("./routes/user-routes");
const app = express();

db.connect(function (err) {
  if (err) throw err;
  console.log("Successfully logged into database!");
});

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", userRoutes);

module.exports = app;
