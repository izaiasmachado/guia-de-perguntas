const prisma = require("../lib/prisma");

module.exports = {
  async index(req, res) {
    const { questionId } = req.params;

    const question = await prisma.question.findUnique({
      where: {
        id: Number(questionId),
      },
    });

    return res.render("question", { question });
  },
};
