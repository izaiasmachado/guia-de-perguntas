const prisma = require("../lib/prisma");

module.exports = {
  async index(req, res) {
    const questions = await prisma.question.findMany();
    res.render("index", {
      questions,
    });
  },
};
