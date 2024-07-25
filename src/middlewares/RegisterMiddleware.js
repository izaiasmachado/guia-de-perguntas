const zod = require("../lib/zod");

const registerSchema = zod.object({
  name: zod.string().min(1, { message: "Seu nome não pode estar vazio" }),
  username: zod
    .string()
    .min(3, { message: "O nome de usuário deve ter no mínimo 3 caracteres" })
    .max(20, { message: "O nome de usuário deve ter no máximo 20 caracteres" })
    .refine((value) => !value.includes(" "), {
      message: "O nome de usuário não pode conter espaços",
    }),
  email: zod.string().email(),
  password: zod
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
    .max(60, { message: "A senha deve ter no máximo 60 caracteres" }),
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

    return res.render("register", {
      errors: formatted,
      data: rawData,
      validated: true,
    });
  },
};
