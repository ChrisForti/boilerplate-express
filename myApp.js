let express = require("express");
let app = express();
require("dotenv").config();

app.use("/public", express.static(__dirname + "/public"));

app.get("/index", (req, res) => {
  res.sendFile("views/index.html");
});

app.get("/json", (req, res) => {
  res.json({
    message: "Hello json",
  });
});

module.exports = app;
