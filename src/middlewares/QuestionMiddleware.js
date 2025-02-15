const zod = require("../lib/zod");
const { renderTemplate } = require("../utils");

const QuestionService = require("../services/QuestionService");

const answerSchema = zod.object({
  content: zod.string().min(1).max(1000),
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

    return await renderTemplate(res, "question", {
      errors: formatted,
      data: rawData,
      validated: true,
    });
  },

  async findQuestion(req, res, next) {
    const questionId = req.params.questionId || req.body.questionId;
    const question = await QuestionService.getQuestion(questionId);

    if (!question) {
      return res.render("404");
    }

    res.locals.question = question;
    return next();
  },
};
