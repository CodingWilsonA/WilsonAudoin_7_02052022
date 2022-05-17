const bcrypt = require("bcrypt");
const db = require("../services/database");
const userModel = require("../models/user-model");

const signup = async (req, res) => {
  userModel.firstName = req.body.firstName;
  userModel.lastName = req.body.lastName;
  userModel.email = req.body.email;
  userModel.password = req.body.password;
  const hashedPassword = await bcrypt.hash(userModel.password, 10);
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

module.exports = { signup };
