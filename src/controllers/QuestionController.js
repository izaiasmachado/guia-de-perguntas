const QuestionService = require("../services/QuestionService");
const { renderTemplate } = require("../utils");

module.exports = {
  async index(req, res) {
    const { question } = res.locals;
    const answers = await QuestionService.getQuestionAnswers(question.id);
    return renderTemplate(res, "question", { question, answers });
  },

  async createAnswer(req, res) {
    const { questionId } = req.params;
    const { question, answer, user } = res.locals;
    await QuestionService.createAnswer(answer, question, user);
    return res.redirect(`/q/${questionId}`);
  },

  async markAsBest(req, res) {
    const { answerId } = req.params;
    await QuestionService.markAsBestAnswer(answerId);
    return res.json({ success: true });
  },
};
