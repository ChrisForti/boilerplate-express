let express = require("express");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");

// calls in middleware
app.use("/public", express.static(__dirname + "/public"));

// logger to make requests
app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Mount middleware
app.use(bodyParser.urlencoded({ extended: false }));

//GET index.html, and serve it aT ROOT
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//GET .env file and uses an if loop to manipulate json
app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

// Middleware function to add current time to req.time
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next(); // Pass control to the next function in the chain
  },
  (req, res) => {
    // Handler to respond with JSON object containing req.time
    res.json({ time: req.time });
  }
);

//GET route parameter input from client
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

//GET Query Parameter Input from the Client
app.get("/name", function (req, res) {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({ name: `${firstName} ${lastName}` });
});

// POST handler for /name endpoint
app.post("/name", function (req, res) {
  const firstName = req.body.first;
  const lastName = req.body.last;
  res.json({ name: `${firstName} ${lastName}` });
});

// app.post("/submit", (req, res) => {
//   // Access the body of the request
//   const { name, age } = req.body;
//   // Do something with the data
//   res.send(`Name: ${name}, Age: ${age}`);
// });

module.exports = app;
