const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const User = require("../models/user");
const authCfg = require("../util/gg-auth-config");

const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(authCfg.clientId, authCfg.clientSecret);
OAuth2_client.setCredentials({ refresh_token: authCfg.refreshToken });

const sendMail = (recipient, subject, msg) => {
  const accessToken = OAuth2_client.getAccessToken();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: authCfg.user,
      clientId: authCfg.clientId,
      clientSecret: authCfg.clientSecret,
      accessToken: accessToken,
      refreshToken: authCfg.refreshToken,
    },
  });

  transporter.sendMail({
    to: recipient,
    from: authCfg.user,
    subject: subject,
    html: msg,
  });
};

exports.getLogin = (req, res, next) => {
  let errMesg = req.flash("error");
  if (errMesg.length > 0) {
    errMesg = errMesg[0];
  } else {
    errMesg = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: errMesg,
  });
};

exports.getSignup = (req, res, next) => {
  let errMesg = req.flash("error");
  if (errMesg.length > 0) {
    errMesg = errMesg[0];
  } else {
    errMesg = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: errMesg,
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash("error", "Invalid email or password!");
      return res.redirect("/login");
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        res.redirect("/");
      });
    } else {
      req.flash("error", "Invalid email or password!");
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const user = await User.findOne({ email: email });
    if (user) {
      req.flash("error", "Email already used!");
      return res.redirect("/signup");
    } else {
      const hashPassword = bcrypt.hashSync(password, 12);
      const user = new User({
        email: email,
        password: hashPassword,
        cart: { items: [] },
      });
      await user.save();
      res.redirect("/login");
      sendMail(
        req.body.email,
        "Sign up succeeded!",
        "<h1>You successfully signed up!</h1>"
      );
    }
  } catch (err) {
    console.log(err);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
