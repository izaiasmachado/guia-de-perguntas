const AnswerService = require("../services/AnswerService");
const QuestionService = require("../services/QuestionService");

module.exports = {
  async create(req, res) {
    const { answer, user } = res.locals;
    const createdAnswer = await AnswerService.createAnswer(answer, user);

    if (!createdAnswer) {
      return res.json({ message: "Não foi possível criar uma resposta" });
    }

    return res.redirect(`/q/${answer.questionId}`);
  },

  async markAsBest(req, res) {
    const { answer } = res.locals;
    await QuestionService.markAsBestAnswer(answer.id);
    return res.redirect(`/q/${answer.questionId}`);
  },

  async unmarkAsBest(req, res) {
    const { answer } = res.locals;
    await QuestionService.unmarkAsBestAnswer(answer.id);
    return res.redirect(`/q/${answer.questionId}`);
  },
};
