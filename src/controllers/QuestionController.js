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
    const { answer, user } = res.locals;
    const question = await QuestionService.getQuestion(questionId);

    if (!question) {
      return res.status(404).send("Pergunta não encontrada");
    }

    await QuestionService.createAnswer(answer, question, user);
    return res.redirect(`/q/${questionId}`);
  },
};
