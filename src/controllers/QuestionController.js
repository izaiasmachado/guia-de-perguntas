const AnswerService = require("../services/AnswerService");
const InboxService = require("../services/InboxService");
const { renderTemplate } = require("../utils");

module.exports = {
  async index(req, res) {
    const { question } = res.locals;
    const answers = await AnswerService.getAnswersByQuestionId(question.id);

    if (res?.locals?.user?.id && res?.locals?.user?.id == question.authorId) {
      answers.forEach(async (answer) => {
        await InboxService.markAnswersAsRead(answer.id);
      });
    }

    return await renderTemplate(res, "question", { question, answers });
  },
};
