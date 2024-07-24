const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const apiRouter = require("./routes/api");
const webRouter = require("./routes/web");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/api", apiRouter);
app.use("/", webRouter);
app.use(express.static("public"));

module.exports = app;
