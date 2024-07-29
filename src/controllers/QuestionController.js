const QuestionService = require("../services/QuestionService");
const { renderTemplate } = require("../utils");
const InboxService = require("../services/InboxService");

module.exports = {
  async index(req, res) {
    const { question } = res.locals;

    const answers = await QuestionService.getAnswers(question.id);

    if (res?.locals?.user?.id && res?.locals?.user?.id == question.authorId) {
      answers.forEach(async (answer) => {
        await InboxService.markAnswersAsRead(answer.id);
      });
    }

    return await renderTemplate(res, "question", { question, answers });
  },

  async createAnswer(req, res) {
    const { questionId } = req.params;
    const { question, answer, user } = res.locals;
    await QuestionService.createAnswer(answer, question, user);
    return res.redirect(`/q/${questionId}`);
  },
};
