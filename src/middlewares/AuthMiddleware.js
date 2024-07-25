const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");

module.exports = {
  async loadUserIfTokenIsGiven(req, res, next) {
    const token = req.cookies?.authorization;
    const tokenPayload = await AuthService.decodeUserToken(token);
    const userExists = await UserService.findUserById(tokenPayload?.id);

    if (!token || !tokenPayload || !userExists) {
      return next();
    }

    res.locals.user = userExists;
    return next();
  },

  async ensureUserIsAuthenticated(req, res, next) {
    const originRoute = req.baseUrl + req.path;

    if (!res.locals.user) {
      return res.redirect(
        `/login?redirect=${originRoute}&error=unauthenticated`
      );
    }

    return next();
  },

  async ensureUserIsNotAuthenticated(req, res, next) {
    if (res.locals.user) {
      return res.redirect("/");
    }

    return next();
  },
};
