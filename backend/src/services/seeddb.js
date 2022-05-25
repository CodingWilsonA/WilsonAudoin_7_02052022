const db = require("./database");
const usersTable = require("../models/tables-model");

db.getConnection(function (err, conn) {
  if (err) {
    console.error(err.message);
    process.exit();
  }
  console.log("Successfully logged into database!");

  conn.query(usersTable, function (err) {
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
