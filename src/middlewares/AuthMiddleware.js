const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");

module.exports = {
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
