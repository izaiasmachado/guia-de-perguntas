const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const HomeController = require("../controllers/HomeController");

const authRouter = require("./auth");
const questionRouter = require("./question");

router.use(AuthMiddleware.loadUserIfTokenIsGiven);

router.get("/", HomeController.index);
router.use("/q", questionRouter);
router.use("/auth", authRouter);

router.use((req, res) => {
  console.log("404");
  return res.status(404).send("Not found");
});

module.exports = router;
