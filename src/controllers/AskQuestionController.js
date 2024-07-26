const zod = require("../lib/zod");
const prisma = require("../lib/prisma");

const askQuestionSchema = zod.object({
  title: zod.string().min(1),
  content: zod.string().min(1),
});

module.exports = {
  index(req, res) {
    return res.render("ask-question", {
      errors: {},
      data: {
        title: "",
        content: "",
      },
      validated: false,
    });
  },

  async create(req, res) {
    const rawData = req.body;
    const { success, error, data } = askQuestionSchema.safeParse(rawData);
    const authorId = res.locals.user.id;

    if (!success) {
      const formatted = error.format();

      return res.render("ask-question", {
        errors: formatted,
        data: rawData,
        validated: true,
      });
    }

    await prisma.question.create({
      data: {
        ...data,
        authorId,
      },
    });

    return res.redirect("/");
  },
};
