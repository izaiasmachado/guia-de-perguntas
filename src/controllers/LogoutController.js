module.exports = {
  index(req, res) {
    res.clearCookie("authorization");
    console.log("User logged out successfully");
    return res.redirect("/auth/login?logout=true");
  },
};
