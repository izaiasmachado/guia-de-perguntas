const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();
const authRouter = express.Router();

const AuthMiddleware = require("../middlewares/AuthMiddleware");
const HomeController = require("../controllers/HomeController");
const AskQuestionController = require("../controllers/AskQuestionController");

router.get("/", HomeController.index);

router.get("/q/:questionId", async (req, res) => {
  const { questionId } = req.params;

  const question = await prisma.question.findUnique({
    where: {
      id: Number(questionId),
    },
  });

  return res.render("question", { question });
});

router.use("/auth", AuthMiddleware.checkIfUserIsAuthenticated, authRouter);

authRouter.get("/ask", AskQuestionController.index);
authRouter.post("/ask", AskQuestionController.create);

module.exports = router;
