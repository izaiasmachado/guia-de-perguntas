const { renderTemplate } = require("../utils");
const QuestionService = require("../services/QuestionService");

module.exports = {
  async index(req, res) {
    const questions = await QuestionService.getAllQuestions();

    return renderTemplate(res, "index", {
      questions,
    });
  },
};
