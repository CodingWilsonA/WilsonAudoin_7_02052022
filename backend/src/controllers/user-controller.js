const bcrypt = require("bcrypt");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../services/database");
const userModel = require("../models/user-model");

const signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await userModel.validateAsync({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
      [user.firstName, user.lastName, user.email, user.password],
      function (err) {
        if (err) {
          return res
            .status(400)
            .json({ message: `Bad request : ${err.message}` });
        }
        return res.status(201).json({ message: "User sucessfully created" });
      }
    );
  } catch (err) {
    return res.status(400).json({ message: `Bad request : ${err.message}` });
  }
};

const login = async (req, res) => {
  if (req.body.email !== "" && req.body.password !== "") {
    try {
      const user = await userModel.validateAsync({
        email: req.body.email,
        password: req.body.password,
      });
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [user.email],
        function (err, dbUser) {
          if (err) {
            return res.status(403).json({ message: "Wrong credentials" });
          }
          if (dbUser[0]) {
            bcrypt.compare(user.password, dbUser[0].password).then((valid) => {
              if (!valid) {
                return res.status(403).json({ message: "Wrong credentials" });
              }
              return res.status(200).json({
                userId: dbUser[0].user_id,
                userAuthLvl: dbUser[0].auth_lvl,
                token: jwt.sign({ userId: dbUser[0].user_id }, config.jwtSalt, {
                  expiresIn: "4h",
                }),
              });
            });
          } else {
            return res.status(403).json({ message: "Wrong credentials" });
          }
        }
      );
    } catch (err) {
      return res.status(400).json({ message: `Bad request : ${err.message}` });
    }
  }
};

module.exports = { signup, login };
