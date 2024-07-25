const express = require("express");

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const LoginMiddleware = require("../middlewares/LoginMiddleware");

const HomeController = require("../controllers/HomeController");
const AskQuestionController = require("../controllers/AskQuestionController");
const QuestionController = require("../controllers/QuestionController");
const LoginController = require("../controllers/LoginController");

const publicRouter = express.Router();
const privateRouter = express.Router();

publicRouter.get("/", HomeController.index);
publicRouter.get("/q/:questionId", QuestionController.index);
publicRouter.get("/login", LoginController.index);
publicRouter.post(
  "/login",
  LoginMiddleware.validateLoginBody,
  LoginController.login
);

publicRouter.use(AuthMiddleware.checkIfUserIsAuthenticated, privateRouter);
privateRouter.get("/ask", AskQuestionController.index);
privateRouter.post("/ask", AskQuestionController.create);

module.exports = publicRouter;
