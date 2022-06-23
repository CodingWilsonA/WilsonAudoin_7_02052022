const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const app = express();

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

var whitelist = ["http://localhost:8080", "http://127.0.0.1:4200"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors());
app.options("*", cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "../images")));
app.use(helmet());
app.use(function (req, res, next) {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});
app.use("/api/auth/login", rateLimiter);
app.use("/api/auth", cors(corsOptions), userRoutes);
app.use("/api", cors(corsOptions), postRoutes);

process
  .on("unhandledRejection", (err, promise) => {
    console.error(err, "Unhandled rejection at promise: ", promise);
  })
  .on("uncaughtException", (err) => {
    console.error("Uncaught exception: ", err);
    process.exit(1);
  });

module.exports = app;
