const prisma = require("../lib/prisma");
const bcrypt = require("../lib/bcrypt");

module.exports = {
  async isEmailOrUsernameAlreadyUsed(user) {
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: user.email,
          },
          {
            username: user.username,
          },
        ],
      },
    });

    return !!userExists;
  },

  async create(userData) {
    const userExists = await this.isEmailOrUsernameAlreadyUsed(userData);

    if (userExists) {
      return null;
    }

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

  async findUserByEmailAndPassword(email, password) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.comparePassword(
      password,
      hashedPassword
    );

    if (!isPasswordValid) {
      return null;
    }

    return this._serialize(user);
  },

  async findUserById(id) {
    if (!id) return null;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return this._serialize(user);
  },
};
