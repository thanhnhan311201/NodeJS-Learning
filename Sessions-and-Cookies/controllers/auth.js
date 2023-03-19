const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findById("641486aa69672354f08db143");
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(() => {
      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
