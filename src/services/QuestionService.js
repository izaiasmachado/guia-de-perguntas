const prisma = require("../lib/prisma");

module.exports = {
  async createQuestion(question, author) {
    const data = {
      ...question,
      authorId: author.id,
    };

    return await prisma.question.create({
      data,
    });
  },

  async getQuestion(questionId) {
    return await prisma.question.findUnique({
      where: {
        id: Number(questionId),
      },
    });
  },

  async getAllQuestions() {
    return await prisma.question.findMany({
      include: {
        author: true,
      },
    });
  },

  async createAnswer(answer, question, author) {
    const data = {
      ...answer,
      questionId: question.id,
      authorId: author.id,
    };

    await prisma.answer.create({
      data,
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
