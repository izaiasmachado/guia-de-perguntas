const COOKIE_OPTIONS = "HttpOnly; Secure; SameSite=Strict; Path=/";

function setJwtCookie(res, jwt) {
  res.header("Set-Cookie", `authorization=${jwt}; ${COOKIE_OPTIONS}`);
}

module.exports = {
  setJwtCookie,
};
