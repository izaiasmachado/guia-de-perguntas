const zod = require("../lib/zod");
const { renderTemplate } = require("../utils");

const AnswerService = require("../services/AnswerService");

const answerSchema = zod.object({
  questionId: zod.union([zod.number(), zod.string().transform(Number)]),
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

    return renderTemplate(res, "question", {
      errors: formatted,
      data: {
        question: res.locals.question,
        answers: res.locals.question.answers,
        ...rawData,
      },
    });
  },

  async findAnswer(req, res, next) {
    const answerId = req.params.answerId || req.body.answerId;
    const answer = await AnswerService.findAnswerById(answerId);

    if (!answer) {
      return res.render("404");
    }

    res.locals.answer = answer;
    return next();
  },
};
