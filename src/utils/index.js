const InboxService = require("../services/InboxService");

const COOKIE_OPTIONS = "HttpOnly; Secure; SameSite=Strict; Path=/";

function setJwtCookie(res, jwt) {
  res.header("Set-Cookie", `authorization=${jwt}; ${COOKIE_OPTIONS}`);
}

async function renderTemplate(res, view, data) {
  const user = res.locals?.user;
  const isAuthenticated = !!user;

  const inboxMessages = await InboxService.getUnreadAnswersForUser(user);

  const dataWithAuthentication = {
    ...data,
    isAuthenticated,
    user,
    inboxMessages,
  };

  return res.render(view, dataWithAuthentication);
}

module.exports = {
  setJwtCookie,
  renderTemplate,
};
