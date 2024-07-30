const AnswerService = require("../services/AnswerService");
const { renderTemplate } = require("../utils");

module.exports = {
  async index(req, res) {
    const { question } = res.locals;
    const answers = await AnswerService.getAnswersByQuestionId(question.id);
    return renderTemplate(res, "question", { question, answers });
  },
};
