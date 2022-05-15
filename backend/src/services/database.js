const mysql = require("mysql2");
const config = require("../config/config");
const dbHost = config.db.host;
const dbName = config.db.database;
const dbUser = config.db.user;
const dbPass = config.db.password;

const db = mysql.createConnection({
  host: dbHost,
  database: dbName,
  user: dbUser,
  password: dbPass,
});

module.exports = db;
