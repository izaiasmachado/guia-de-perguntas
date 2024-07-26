const QuestionService = require("../services/QuestionService");

module.exports = {
  index(req, res) {
    return res.render("ask-question", {
      errors: {},
      data: {
        title: "",
        content: "",
      },
    });
  },

  async create(req, res) {
    const { user, askedQuestion } = res.locals;
    const question = await QuestionService.createQuestion(askedQuestion, user);
    return res.redirect(`/q/${question.id}`);
  },
};
