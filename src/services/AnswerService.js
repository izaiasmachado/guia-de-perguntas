const prisma = require("../lib/prisma");
const QuestionService = require("./QuestionService");

module.exports = {
  async createAnswer(answer, author) {
    const question = await QuestionService.getQuestion(answer?.questionId);

    if (!answer || !author || !question) {
      return null;
    }

    const data = {
      ...answer,
      authorId: author.id,
    };

    return await prisma.answer.create({
      data,
    });
  },

  async findAnswerById(answerId) {
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

  async getAnswersByQuestionId(questionId) {
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
};
