let express = require("express");
let app = express();

app.use("/public", express.static(__dirname + "/public"));
// app.use(express.static("views/index.html"));

app.get("/", (req, res) => {
  res.sendFile("views/index.html");
});

app.get("/json", (req, res) => {
  res.json({
    message: "Hello json",
  });
});

module.exports = app;
