const COOKIE_OPTIONS = "HttpOnly; Secure; SameSite=Strict; Path=/";

function setJwtCookie(res, jwt) {
  res.header("Set-Cookie", `authorization=${jwt}; ${COOKIE_OPTIONS}`);
}

function renderTemplate(res, view, data) {
  const user = res.locals?.user;
  const isAuthenticated = !!user;

  const dataWithAuthentication = {
    ...data,
    isAuthenticated,
    user,
  };

  return res.render(view, dataWithAuthentication);
}

module.exports = {
  setJwtCookie,
  renderTemplate,
};
