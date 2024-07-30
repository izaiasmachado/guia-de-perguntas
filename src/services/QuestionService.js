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
    if (!questionId) {
      return null;
    }

    return await prisma.question.findUnique({
      where: {
        id: Number(questionId),
      },
      include: {
        author: true,
        answers: true,
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

  async searchQuestions(searchQuery) {
    return await prisma.question.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchQuery,
            },
          },
          {
            content: {
              contains: searchQuery,
            },
          },
        ],
      },
      include: { author: true },
    });
  },

  async markAsBestAnswer(answerId) {
    const answer = await prisma.answer.findUnique({
      where: { id: Number(answerId) },
    });

    if (!answerId || !answer) {
      return;
    }

    await prisma.question.update({
      where: { id: Number(answer.questionId) },
      data: {
        bestAnswerId: answer.id,
      },
    });
  },

  async unmarkAsBestAnswer(answerId) {
    const answer = await prisma.answer.findUnique({
      where: { id: Number(answerId) },
      include: {
        question: true,
      },
    });

    if (!answerId || !answer || answer.question.bestAnswerId !== answer.id) {
      return;
    }

    await prisma.question.update({
      where: { id: Number(answer.questionId) },
      data: {
        bestAnswerId: null,
      },
    });
  },
};
