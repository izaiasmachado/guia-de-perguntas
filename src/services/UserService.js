const prisma = require("../lib/prisma");
const bcrypt = require("../lib/bcrypt");

module.exports = {
  async create(userData) {
    const hashedPassword = await bcrypt.hashPassword(userData.password);
    const user = {
      ...userData,
      password: hashedPassword,
    };

    const createdUser = await prisma.user.create({
      data: user,
    });
    return this._serialize(createdUser);
  },

  _serialize(user) {
    const copyUser = { ...user };
    delete copyUser.password;
    return copyUser;
  },
};
