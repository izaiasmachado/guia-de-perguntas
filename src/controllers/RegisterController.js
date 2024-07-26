const UserService = require("../services/UserService");

const buildLoginUrl = (queryParams) => {
  const redirectUrl = queryParams?.redirect || "/";
  return `/auth/login?redirect=${redirectUrl}`;
};

module.exports = {
  index(req, res) {
    return res.render("register", {
      errors: {},
      data: {
        loginUrl: buildLoginUrl(req.query),
      },
      validated: false,
    });
  },

  async register(req, res) {
    const rawData = req.body;
    const user = await UserService.create(res.locals.user);

    if (!user) {
      return res.render("register", {
        alerts: {
          globalDanger: "O nome de usuário ou email fornecido já está em uso",
        },
        errors: {},
        data: {
          ...rawData,
          loginUrl: buildLoginUrl(req.query),
        },
      });
    }

    const redirectUrl = req.query.redirect || "/";
    return res.redirect(`/auth/login?registered=true&redirect=${redirectUrl}`);
  },
};
