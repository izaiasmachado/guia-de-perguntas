const AnswerController = require("../controllers/AnswerController");

const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const QuestionMiddleware = require("../middlewares/QuestionMiddleware");
const AnswerMiddleware = require("../middlewares/AnswerMiddleware");

router.use(AuthMiddleware.ensureUserIsAuthenticated);

router.post(
  "/",
  QuestionMiddleware.findQuestion,
  AnswerMiddleware.validatePostAnswerBody,
  AnswerController.create
);

router.post(
  "/:answerId/mark-solution",
  AnswerMiddleware.findAnswer,
  AnswerController.markAsBest
);

router.post(
  "/:answerId/unmark-solution",
  AnswerMiddleware.findAnswer,
  AnswerController.unmarkAsBest
);

module.exports = router;
