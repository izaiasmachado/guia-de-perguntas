const UserService = require("../services/UserService");

module.exports = {
  async register(req, res) {
    const user = await UserService.create(res.locals.user);

    return res.json({
      message: "Usuário criado com sucesso",
      user,
    });
  },
};
