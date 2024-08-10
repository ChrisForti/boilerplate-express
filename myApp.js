let express = require("express");
let app = express();
require("dotenv").config();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("views/index.html");
});

app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

module.exports = app;
