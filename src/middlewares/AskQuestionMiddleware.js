const zod = require("../lib/zod");
const { renderTemplate } = require("../utils");

const askQuestionSchema = zod.object({
  title: zod.string().min(1),
  content: zod.string().min(1),
});

module.exports = {
  async validateAskQuestionBody(req, res, next) {
    const rawData = req.body;
    const { success, error, data } = askQuestionSchema.safeParse(rawData);

    if (success) {
      res.locals.askedQuestion = data;
      return next();
    }

    const formatted = error.format();

    return renderTemplate(res, "ask-question", {
      errors: formatted,
      data: rawData,
      validated: true,
    });
  },
};
