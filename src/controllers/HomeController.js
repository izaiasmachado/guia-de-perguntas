const { renderTemplate } = require("../utils");
const QuestionService = require("../services/QuestionService");

module.exports = {
  async index(req, res) {
    const { search } = req.query;
    const questions = search?
                      await QuestionService.searchQuestions(search): 
                      await QuestionService.getAllQuestions();

    return renderTemplate(res, "index", {
      questions,
      search,
    });
  },
};
