const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const QuestionController = require("../controllers/QuestionController");
const AskQuestionController = require("../controllers/AskQuestionController");

router.get(
  "/ask",
  AuthMiddleware.ensureUserIsAuthenticated,
  AskQuestionController.index
);
router.get("/:questionId", QuestionController.index);

module.exports = router;
