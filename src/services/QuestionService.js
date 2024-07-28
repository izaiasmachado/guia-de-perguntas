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
      include: {
        author: true,
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
      include: { author: true}
    });
  },
  
  async markAsBestAnswer(answerId) {
    
    const answer = await prisma.answer.findUnique({
      where: { id: Number(answerId) },
      include: { question: true },
    });

    if (!answer) {
      throw new Error("Resposta não encontrada");
    }

    await prisma.answer.updateMany({
      where: {
        questionId: answer.questionId,
        isBest: true,
      },
      data: {
        isBest: false,
      },
    });

    return await prisma.answer.update({
      where: {
        id: Number(answerId),
      },
      data: {
        isBest: true,
      },
    });
  },
};
