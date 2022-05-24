const mysql = require("mysql2");
const config = require("../config/config");

//TODO écrire un "petit" script et déplacer le modèle dans son propre dossier
let createTableUsers = `CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);`;

const db = mysql.createPool({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
});

db.getConnection(function (err, conn) {
  if (err) {
    //TODO KILL PROCESS + regarder unhandled expressions dans node
    console.error(err.message);
    process.exit();
  }
  console.log("Successfully logged into database!");

  conn.query(createTableUsers, function (err) {
    if (err) {
      console.error(err.message);
      return;
    }
  });
  conn.release(function (err) {
    if (err) {
      console.error(err.message);
      return;
    }
  });
});

module.exports = db;
