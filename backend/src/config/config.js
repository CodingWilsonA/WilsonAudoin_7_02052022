const dotenv = require("dotenv");
dotenv.config({ path: "./src/env/default.env" });

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  jwtSalt: process.env.TOKEN_SALT,
};
