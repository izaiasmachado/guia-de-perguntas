const prisma = require("../lib/prisma");

module.exports = {
  async create(userData) {
    const createdUser = await prisma.user.create({
      data: userData,
    });
    return this._serialize(createdUser);
  },

  _serialize(user) {
    const copyUser = { ...user };
    delete copyUser.password;
    return copyUser;
  },
};
