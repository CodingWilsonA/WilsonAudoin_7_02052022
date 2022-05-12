const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.post("/signup", (req, res) => {
  res.send({
    message: `Hello ${req.body.firstName} ${req.body.lastName}, your email is ${req.body.email} and your password is ${req.body.password}`,
  });
});

module.exports = app;
