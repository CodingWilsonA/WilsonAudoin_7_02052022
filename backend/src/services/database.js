const mysql = require("mysql2");
const config = require("../config/config");

const db = mysql.createPool({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
});

module.exports = db;
