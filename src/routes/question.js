const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const AskQuestionMiddleware = require("../middlewares/AskQuestionMiddleware");
const QuestionMiddleware = require("../middlewares/QuestionMiddleware");

const QuestionController = require("../controllers/QuestionController");
const AskQuestionController = require("../controllers/AskQuestionController");

router.get(
  "/ask",
  AuthMiddleware.ensureUserIsAuthenticated,
  AskQuestionController.index
);
router.post(
  "/ask",
  AuthMiddleware.ensureUserIsAuthenticated,
  AskQuestionMiddleware.validateAskQuestionBody,
  AskQuestionController.create
);
router.post(
  "/:questionId/answers",
  AuthMiddleware.ensureUserIsAuthenticated,
  QuestionMiddleware.findQuestion,
  QuestionMiddleware.validatePostAnswerBody,
  QuestionController.createAnswer
);
router.get(
  "/:questionId",
  QuestionMiddleware.findQuestion,
  QuestionController.index
);

module.exports = router;
