const express = require("express");
const router = express.Router();

const prisma = require("./lib/prisma");

const HomeController = require("./controllers/HomeController");
const AskQuestionController = require("./controllers/AskQuestionController");

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

module.exports = router;
