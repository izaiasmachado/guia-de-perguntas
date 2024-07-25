const UserService = require("../services/UserService");

module.exports = {
  index(req, res) {
    return res.render("register", {
      errors: {},
      data: {},
      validated: false,
    });
  },

  async register(req, res) {
    const rawData = req.body;
    const user = await UserService.create(res.locals.user);

    if (!user) {
      return res.render("register", {
        errors: {
          globalDanger: "O nome de usuário ou email fornecido já está em uso",
        },
        data: rawData,
      });
    }

    return res.redirect("/login?registered=true");
  },
};
