const UserService = require("../services/UserService");

module.exports = {
  async register(req, res) {
    const user = await UserService.create(res.locals.user);

    return res.json({
      message: "Usuário criado com sucesso",
      user,
    });
  },

  async login(req, res) {
    const { email, password } = res.locals.user;
    const user = await UserService.findUserByEmailAndPassword(email, password);
    return res.status(200).json({
      message: "Login realizado com sucesso",
      user,
    });
  },
};
