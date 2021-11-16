const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
};

const loadHtml = (req, res, next) => {
  res.status(200).sendFile(__dirname + "/views/index.html");
};

const sendJson = (req, res) => {
  const message =
    process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";

  res.status(200).json({ message });
};

const sendJsonEcho = (req, res) => {
  res.json({ echo: req.params.word });
};

const sendJsonName = (req, res) => {
  res.json({ name: `${req.query.first} ${req.query.last}` });
};

const sendJsonNamePost = (req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}` });
};

const setTime = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

const sendTime = (req, res, next) => {
  res.json({ time: req.time });
};

app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger);

app.use("/public", express.static(__dirname + "/public"));

app.get("/", loadHtml);

app.get("/json", sendJson);

app.get("/now", setTime, sendTime);

app.get("/:word/echo", sendJsonEcho);

app.get("/name", sendJsonName);

app.post("/name", sendJsonNamePost);

module.exports = app;
