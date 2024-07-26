const prisma = require("../lib/prisma");
const QuestionService = require("../services/QuestionService");

module.exports = {
  async index(req, res) {
    const { questionId } = req.params;

    const question = await prisma.question.findUnique({
      where: {
        id: Number(questionId),
      },
    });

    const answers = await QuestionService.getAnswers(questionId);

    return res.render("question", { question, answers });
  },

  async createAnswer(req, res) {
    const { questionId } = req.params;
    const { content } = req.body;
    console.log(res.locals)
    const userId = res.locals.user.id; 

    try {
      answerData = {
        content,
        questionId: Number(questionId),
        authorId: userId,
      }

      await QuestionService.createAnswer(answerData);

      return res.redirect(`/q/${questionId}`);
    } catch (error) {
      console.error("Erro ao criar resposta:", error);
      res.status(500).send("Erro ao criar resposta");
    }
  },
};
