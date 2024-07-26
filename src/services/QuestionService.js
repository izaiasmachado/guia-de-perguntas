const prisma = require("../lib/prisma");

module.exports = {
  async createQuestion(question, author) {
    const data = {
      ...question,
      authorId: author.id,
    };

    await prisma.question.create({
      data,
    });
  },

  async createAnswer(answerData) {
    await prisma.answer.create({
      data: answerData,
    });
  },

  async getAnswers(questionId) {
    return await prisma.answer.findMany({
      where: {
        questionId: Number(questionId),
      },
      include: {
        author: true,
      },
    });
  },
};
