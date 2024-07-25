const zod = require("../lib/zod");

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().nonempty({
    message: "A senha não pode ser vazia",
  }),
});

module.exports = {
  async validateLoginBody(req, res, next) {
    const rawData = req.body;
    const { success, error, data } = loginSchema.safeParse(rawData);

    if (success) {
      res.locals.user = data;
      return next();
    }

    const formatted = error.format();

    return res.render("login", {
      errors: formatted,
      data: rawData,
      validated: true,
    });
  },
};
