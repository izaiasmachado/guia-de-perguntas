const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");
const { setJwtCookie } = require("../utils");

const buildAlertsObject = (queryParams) => {
  const globalSuccess =
    queryParams?.registered === "true"
      ? "Usuário registrado com sucesso"
      : null;

  const globalDanger =
    queryParams?.error === "unauthenticated"
      ? "Faça login para continuar sua navegação"
      : null;

  return {
    globalSuccess,
    globalDanger,
  };
};

const buildRegisterUrl = (queryParams) => {
  const redirectUrl = queryParams?.redirect || "/auth/login";
  return `/register?redirect=${redirectUrl}`;
};

module.exports = {
  async index(req, res) {
    const alerts = buildAlertsObject(req.query);
    return await res.render("login", {
      errors: {},
      data: {
        registerUrl: buildRegisterUrl(req.query),
      },
      alerts,
    });
  },

  async login(req, res) {
    const { email, password } = res.locals.user;
    const user = await UserService.findUserByEmailAndPassword(email, password);

    if (!user) {
      return res.render("login", {
        errors: {},
        alerts: {
          globalDanger: "Email ou senha inválidos",
        },
        data: {
          email,
          password,
          registerUrl: buildRegisterUrl(req.query),
        },
      });
    }

    const token = await AuthService.signUserToken(user);

    if (!token) {
      return res.status(500);
    }

    setJwtCookie(res, token);

    const redirectUrl = req.query.redirect || "/";
    return res.redirect(redirectUrl);
  },
};
