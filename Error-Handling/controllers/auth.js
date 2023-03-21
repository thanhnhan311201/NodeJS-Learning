const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { validationResult } = require("express-validator");
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
    oldInput: {
      email: "",
      password: "",
    },
    validationErros: [],
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
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErros: [],
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email,
          password,
        },
        validationErros: errors.array(),
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        errorMessage: "Invalid email or password!",
        oldInput: {
          email,
          password,
        },
        validationErros: [],
      });
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        res.redirect("/");
      });
    } else {
      res.status(422).render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        errorMessage: "Invalid email or password!",
        oldInput: {
          email,
          password,
        },
        validationErros: [],
      });
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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        path: "/signup",
        pageTitle: "Signup",
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email,
          password,
          confirmPassword,
        },
        validationErros: errors.array(),
      });
    }

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
  } catch (err) {
    console.log(err);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let errMesg = req.flash("error");
  if (errMesg.length > 0) {
    errMesg = errMesg[0];
  } else {
    errMesg = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: errMesg,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    try {
      if (err) {
        console.log(err);
        return res.redirect("/reset");
      }
      const token = buffer.toString("hex");
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        req.flash("error", "No account with that email found.");
        return res.redirect("/reset");
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      const result = await user.save();
      res.redirect("/login");

      const subject = "Password reset";
      const resetHtml = `
      <p>You requested a password reset</p>
      <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
      `;
      sendMail(req.body.email, subject, resetHtml);
    } catch (err) {
      console.log(err);
    }
  });
};

exports.getNewPassword = async (req, res, next) => {
  try {
    let errMesg = req.flash("error");
    if (errMesg.length > 0) {
      errMesg = errMesg[0];
    } else {
      errMesg = null;
    }

    const token = req.params.token;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.redirect("/reset");
    }
    res.render("auth/new-password", {
      path: "/new-password",
      pageTitle: "New Password",
      errorMessage: errMesg,
      userId: user._id.toString(),
      passwordToken: token,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postNewPassword = async (req, res, next) => {
  try {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;

    const user = await User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId,
    });
    if (!user) {
      return res.redirect("/reset");
    }
    const newHashPassword = bcrypt.hashSync(newPassword, 12);
    user.password = newHashPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    const result = await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};
