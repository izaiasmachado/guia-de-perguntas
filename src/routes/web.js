const express = require("express");

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const HomeController = require("../controllers/HomeController");
const AskQuestionController = require("../controllers/AskQuestionController");
const QuestionController = require("../controllers/QuestionController");

const publicRouter = express.Router();
const privateRouter = express.Router();

publicRouter.get("/", HomeController.index);
publicRouter.get("/q/:questionId", QuestionController.index);

publicRouter.use(AuthMiddleware.checkIfUserIsAuthenticated, privateRouter);
privateRouter.get("/ask", AskQuestionController.index);
privateRouter.post("/ask", AskQuestionController.create);

module.exports = publicRouter;
