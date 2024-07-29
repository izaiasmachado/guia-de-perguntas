const prisma = require("../lib/prisma");

module.exports = {
  async getUnreadAnswersForUser(user) {
    try {
      if (!user) {
        return null;
      }

      const inboxMessages = await this.handleGetUnreadAnswersForUser(user.id);

      return inboxMessages;
    } catch (error) {
      return null;
    }
  },

  async handleGetUnreadAnswersForUser(userId) {
    return await prisma.notifications.findMany({
      where: {
        userId: userId,
        isRead: false,
      },
      include: {
        answer: {
          include: {
            question: true,
          },
        },
      },
    });
  },

  async markAnswersAsRead(answerId) {
    const notification = await prisma.notifications.findFirst({
      where: {
        answerId,
      },
    });

    if (!notification) {
      return null;
    }

    return await prisma.notifications.update({
      where: {
        answerId,
      },
      data: {
        isRead: true,
      },
    });
  },
};
