const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const hashPassword = bcrypt.hashSync(password, 12);
    const user = new User({
      email: email,
      name: name,
      password: hashPassword,
    });
    const result = await user.save();
    res.status(201).json({ message: "User created.", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("The user with this email couldnt be found.");
      error.statusCode = 401;
      throw error;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    } else {
      const token = jwt.sign(
        { email: user.email, userId: user._id.toString() },
        "somesuppersecretkey",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: user._id.toString() });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Cant find user.");
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: "Fetched user status.", status: user.status });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postStatus = async (req, res, next) => {
  try {
    const status = req.body.status;
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Cant find user.");
      error.statusCode = 404;
      throw error;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    user.status = status;
    const result = await user.save();
    res
      .status(201)
      .json({ message: "Update user status successfully!", user: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
