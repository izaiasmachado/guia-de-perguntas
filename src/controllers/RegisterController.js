module.exports = {
  index(req, res) {
    return res.render("register", {
      errors: {},
      data: {},
      validated: false,
    });
  },
};
