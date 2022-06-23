const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../services/database");
const userModel = require("../models/user-model");

const sanitizeRegExp = /[<>"'`$]/gm;

const signup = async (req, res) => {
  if (
    sanitizeRegExp.test(req.body.email) ||
    sanitizeRegExp.test(req.body.firstName) ||
    sanitizeRegExp.test(req.body.lastName) ||
    sanitizeRegExp.test(req.body.password)
  ) {
    return res
      .status(401)
      .json({ message: "Some field contains a forbidden value" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await userModel.validateAsync({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    db.query(
      `INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?);
      SELECT user_id, auth_lvl FROM users WHERE user_id = (SELECT LAST_INSERT_ID());`,
      [user.firstName, user.lastName, user.email, user.password],
      function (err, queryResponses) {
        if (err) {
          return res
            .status(400)
            .json({ message: `Bad request : ${err.message}` });
        }
        if (queryResponses) {
          userData = queryResponses[1][0];
          return res.status(201).json({
            message: "User sucessfully created",
            userId: userData.user_id,
            userAuthLvl: userData.auth_lvl,
            token: jwt.sign({ userId: userData.user_id }, config.jwtSalt, {
              expiresIn: "2h",
            }),
          });
        }
      }
    );
  } catch (err) {
    return res.status(400).json({ message: `Bad request : ${err.message}` });
  }
};

const login = async (req, res) => {
  if (
    sanitizeRegExp.test(req.body.email) ||
    sanitizeRegExp.test(req.body.password)
  ) {
    return res
      .status(401)
      .json({ message: "Some field contains a forbidden value" });
  }
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
                  expiresIn: "2h",
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
