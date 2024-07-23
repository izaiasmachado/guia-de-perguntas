const zod = require("../lib/zod");
const prisma = require("../lib/prisma");

const registerSchema = zod.object({
  username: zod.string().min(3).max(20),
  email: zod.string().email(),
  password: zod.string().min(6),
});

module.exports = {
  async validateRegisterBody(req, res, next) {
    const rawData = req.body;
    const { success, error, data } = registerSchema.safeParse(rawData);

    if (success) {
      res.locals.user = data;
      return next();
    }

    const formatted = error.format();

    return res.status(400).json({
      message: "Erro de validação no registro do usuário",
      errors: formatted,
    });
  },

  async userAlreadyExists(req, res, next) {
    const { username, email } = res.locals.user;

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
    });

    if (userExists) {
      return res.status(409).json({
        message: "O nome de usuário ou email fornecido já está em uso",
      });
    }

    return next();
  },
};
