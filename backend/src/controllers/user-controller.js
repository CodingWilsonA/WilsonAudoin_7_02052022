const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../services/database");
const userModel = require("../models/user-model");

const signup = async (req, res) => {
  userModel.firstName = req.body.firstName;
  userModel.lastName = req.body.lastName;
  userModel.email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
    [userModel.firstName, userModel.lastName, userModel.email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(400).json({ message: `Bad request : ${err.code}` });
      }
      return res.status(201).json({ message: "User sucessfully created" });
    }
  );
};

const login = (req, res) => {
  const loginResponse = res;
  const loginRequest = req;
  userModel.email = loginRequest.body.email;
  userModel.password = loginRequest.body.password;
  if (userModel.email !== "" && userModel.password !== "") {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [userModel.email],
      function (err, result) {
        if (err) {
          return loginResponse
            .status(403)
            .json({ message: "Wrong credentials." });
        }
        if (result[0]) {
          bcrypt
            .compare(userModel.password, result[0].password)
            .then((valid) => {
              if (!valid) {
                return loginResponse
                  .status(403)
                  .json({ message: "Wrong credentials" });
              }
              return loginResponse.status(200).json({
                userId: result[0].user_id,
                token: jwt.sign({ userId: result[0].user_id }, config.jwtSalt, {
                  expiresIn: "4h",
                }),
              });
            });
        } else {
          return res.status(403).json({ message: "Wrong credentials" });
        }
      }
    );
  }
};

module.exports = { signup, login };
