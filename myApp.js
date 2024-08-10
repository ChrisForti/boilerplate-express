let express = require("express");
let app = express();
require("dotenv").config();

// calls in middleware
app.use("/public", express.static(__dirname + "/public"));

// logger to make requests
app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// route that links root to index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Uses .env and if loop to manipulate json
app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

module.exports = app;
