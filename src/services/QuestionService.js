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

  async getAnswer(answerId) {
    const answer = await prisma.answer.findUnique({
      where: {
        id: Number(answerId),
      },
      include: {
        author: true,
        bestOf: true,
      },
    });

    if (!answer) {
      return null;
    }

    return answer;
  },

  _serializeAnswer(answer) {
    const { bestOf, questionId } = answer;

    return {
      ...answer,
      isBest: bestOf?.id && bestOf.id === questionId,
    };
  },

  _sortByBestFirst(a, b) {
    if (a.isBest) {
      return -1;
    }

    return 0;
  },

  async getQuestionAnswers(questionId) {
    if (!questionId) {
      return null;
    }

    const answers = await prisma.answer.findMany({
      where: {
        questionId: Number(questionId),
      },
      include: {
        author: true,
        bestOf: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const serializedAnswers = answers.map(this._serializeAnswer);
    const sortedAnswers = serializedAnswers.sort(this._sortByBestFirst);
    return sortedAnswers;
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

    const updatedAnswer = await prisma.answer.findUnique({
      where: {
        id: Number(answerId),
      },
    });

    return this._serializeAnswer(updatedAnswer);
  },

  async unmarkAsBestAnswer(answerId) {
    const answer = await prisma.answer.findUnique({
      where: { id: Number(answerId) },
    });

    if (!answerId || !answer) {
      return;
    }

    await prisma.question.update({
      where: { id: Number(answer.questionId) },
      data: {
        bestAnswerId: null,
      },
    });

    const updatedAnswer = await prisma.answer.findUnique({
      where: {
        id: Number(answerId),
      },
    });

    return this._serializeAnswer(updatedAnswer);
  },
};
