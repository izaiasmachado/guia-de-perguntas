const prisma = require("../lib/prisma");

module.exports = {
    async createAnswer(answerData) {
        await prisma.answer.create({
            data: answerData
          });
    },

    async getAnswers(questionId) {
        return await prisma.answer.findMany({
            where: {
              questionId: Number(questionId),
            },
            include: {
              author: true,
            }
          });
    }
}