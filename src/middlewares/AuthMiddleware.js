const zod = require("../lib/zod");
const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");

const registerSchema = zod.object({
  username: zod
    .string()
    .min(3)
    .max(20)
    .refine((value) => !value.includes(" "), {
      message: "O nome de usuário não pode conter espaços",
    }),
  email: zod.string().email(),
  password: zod.string().min(6),
});

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().nonempty({
    message: "A senha não pode ser vazia",
  }),
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

  async validateLoginBody(req, res, next) {
    const rawData = req.body;
    const { success, error, data } = loginSchema.safeParse(rawData);

    if (success) {
      res.locals.user = data;
      return next();
    }

    const formatted = error.format();
    return res.status(400).json({
      message: "Erro de validação no login do usuário",
      errors: formatted,
    });
  },

  async checkIfUserIsAuthenticated(req, res, next) {
    const token = req.cookies?.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    const { id: userId } = await AuthService.decodeUserToken(token);
    const userExists = await UserService.findUserById(userId);

    if (!userExists) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    res.locals.user = userExists;
    return next();
  },
};
