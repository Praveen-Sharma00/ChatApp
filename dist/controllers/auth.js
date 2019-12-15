"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

const postLogin = async (req, res) => {
  res.send(req.body);
};

const postSignup = async (req, res) => {
  res.send('postsignup');
};

let authController = {
  postLogin,
  postSignup
};
exports.authController = authController;