const prisma = require("../lib/prisma");
const { renderTemplate } = require("../utils");

module.exports = {
  async index(req, res) {
    const questions = await prisma.question.findMany();

    return renderTemplate(res, "index", {
      questions,
    });
  },
};
