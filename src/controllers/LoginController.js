const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");
const { setJwtCookie } = require("../utils");

module.exports = {
  async index(req, res) {
    return await res.render("login", {
      errors: {},
      data: {},
      validated: false,
    });
  },

  async login(req, res) {
    const { email, password } = res.locals.user;
    const user = await UserService.findUserByEmailAndPassword(email, password);

    if (!user) {
      console.log("Email ou senha inválidos");
      console.log(email, password);
      return res.render("login", {
        errors: {
          global: "Email ou senha inválidos",
        },
        data: {
          email,
          password,
        },
      });
    }

    const token = await AuthService.signUserToken(user);

    if (!token) {
      return res.status(500);
    }

    setJwtCookie(res, token);

    return res.redirect("/");
  },

  // async create(req, res) {
  //   const rawData = req.body;
  //   const { success, error, data } = askQuestionSchema.safeParse(rawData);

  //   if (!success) {
  //     const formatted = error.format();

  //     return res.render("login", {
  //       errors: formatted,
  //       data: rawData,
  //       validated: true,
  //     });
  //   }

  //   return res.redirect("/");
  // },
};
