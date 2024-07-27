const zod = require("../lib/zod");
const { renderTemplate } = require("../utils");

const QuestionService = require("../services/QuestionService");

const answerSchema = zod.object({
  content: zod.string().min(1),
});

module.exports = {
  async validatePostAnswerBody(req, res, next) {
    const rawData = req.body;
    const { success, error, data } = answerSchema.safeParse(rawData);

    if (success) {
      res.locals.answer = data;
      return next();
    }

    const formatted = error.format();

    return renderTemplate(res, "question", {
      errors: formatted,
      data: rawData,
      validated: true,
    });
  },

  async findQuestion(req, res, next) {
    const { questionId } = req.params;
    const question = await QuestionService.getQuestion(questionId);

    if (!question) {
      return res.render("404");
    }

    res.locals.question = question;
    return next();
  },
};
