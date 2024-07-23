const UserService = require("../services/UserService");

module.exports = {
  async register(req, res) {
    const user = await UserService.create(res.locals.user);

    if (!user) {
      return res.status(409).json({
        message: "O nome de usuário ou email fornecido já está em uso",
      });
    }

    return res.json({
      message: "Usuário criado com sucesso",
      user,
    });
  },

  async login(req, res) {
    const { email, password } = res.locals.user;
    const user = await UserService.findUserByEmailAndPassword(email, password);

    if (!user) {
      return res.status(401).json({
        message: "Email ou senha inválidos",
      });
    }

    return res.status(200).json({
      message: "Login realizado com sucesso",
      user,
    });
  },
};
