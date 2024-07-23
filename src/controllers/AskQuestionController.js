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

    if (!success) {
      const formatted = error.format();
      console.log(formatted);
      return res.render("ask-question", {
        errors: formatted,
        data: rawData,
        validated: true,
      });
    }

    await prisma.question.create({
      data,
    });

    return res.redirect("/");
  },
};
