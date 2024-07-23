const express = require("express");
const router = express.Router();

const prisma = require("./lib/prisma");

const HomeController = require("./controllers/HomeController");
const AskQuestionController = require("./controllers/AskQuestionController");
const AuthController = require("./controllers/AuthController");
const AuthMiddleware = require("./middlewares/AuthMiddleware");

router.get("/", HomeController.index);

router.get("/ask", AskQuestionController.index);
router.post("/ask", AskQuestionController.create);

router.get("/q/:questionId", async (req, res) => {
  const { questionId } = req.params;

  const question = await prisma.question.findUnique({
    where: {
      id: Number(questionId),
    },
  });

  return res.render("question", { question });
});

router.post("/login", AuthMiddleware.validateLoginBody, AuthController.login);
router.post(
  "/register",
  AuthMiddleware.validateRegisterBody,
  AuthController.register
);

module.exports = router;
