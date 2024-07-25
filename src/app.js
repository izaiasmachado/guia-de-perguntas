const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

const publicPath = path.join(__dirname, "..", "public");
app.use("/public", express.static(publicPath));

app.use("/", router);

module.exports = app;
