const QuestionService = require("../services/QuestionService");

module.exports = {
  async index(req, res) {
    const { question } = res.locals;
    const answers = await QuestionService.getAnswers(question.id);
    return res.render("question", { question, answers });
  },

  async createAnswer(req, res) {
    const { questionId } = req.params;
    const { question, answer, user } = res.locals;
    await QuestionService.createAnswer(answer, question, user);
    return res.redirect(`/q/${questionId}`);
  },
};
