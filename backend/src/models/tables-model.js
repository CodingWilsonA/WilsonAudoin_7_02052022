let usersTable = `CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );`;

module.exports = usersTable;
