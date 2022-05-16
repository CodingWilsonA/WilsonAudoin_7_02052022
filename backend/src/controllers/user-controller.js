const db = require("../services/database");
const userModel = require("../models/user-model");

const signup = async (req, res) => {
  userModel.firstName = req.body.firstName;
  userModel.lastName = req.body.lastName;
  userModel.email = req.body.email;
  userModel.password = req.body.password;
  db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)",
    [
      userModel.firstName,
      userModel.lastName,
      userModel.email,
      userModel.password,
    ],
    function (err) {
      if (err) {
        return res.status(400).json({ message: `Bad request : ${err.code}` });
      }
      return res.status(201).json({ message: "User sucessfully created" });
    }
  );
};

module.exports = { signup };
