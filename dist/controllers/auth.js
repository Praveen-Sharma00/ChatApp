"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

const login = (req, res) => {
  res.render('index');
};

const postLogin = async (req, res) => {
  res.send('postlogin');
};

const signup = (req, res) => {
  res.render('signup');
};

const postSignup = async (req, res) => {
  res.send('postsignup');
};

let authController = {
  login,
  postLogin,
  signup,
  postSignup
};
exports.authController = authController;