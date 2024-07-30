const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const HomeController = require("../controllers/HomeController");
const PageNotFoundController = require("../controllers/PageNotFoundController");

const authRouter = require("./auth");
const questionRouter = require("./question");
const answer = require("./answer");

router.use(AuthMiddleware.loadUserIfTokenIsGiven);

router.get("/", HomeController.index);
router.use("/q", questionRouter);
router.use("/answer", answer);
router.use("/auth", authRouter);

router.use(PageNotFoundController.index);

module.exports = router;
