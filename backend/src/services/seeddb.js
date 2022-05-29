const db = require("./database");
const usersTable = require("../models/tables-model");

db.getConnection(function (err, conn) {
  if (err) {
    console.error("Seeddb failed to get db connection: ", err);
    process.exit(1);
  }
  console.log("Successfully logged into database!");

  const userTableSeedPromise = new Promise((resolve) => {
    conn.query(usersTable, function (err) {
      if (err) {
        console.error(err.message);
      }
      resolve();
    });
  });
  userTableSeedPromise.then(() => {
    conn.release(function (err) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
  });
});
