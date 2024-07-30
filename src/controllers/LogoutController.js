module.exports = {
  index(req, res) {
    res.clearCookie("authorization");
    return res.redirect("/auth/login?logout=true");
  },
};
