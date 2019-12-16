"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postLogin = async (req, res) => {
  const email = req.body.lemail.trim();
  const password = req.body.lpassword.trim();
  const user = await _User.default.findByCredentials(email, password);

  if (!user) {
    return res.status(404).send({
      error: 'No user found'
    });
  }

  req.session.user = user;
  req.session.isLoggedIn = true;
  req.session.save(err => {
    if (err) {
      console.log('Error storing session');
      process.exit();
    }
  });
  res.redirect('/group-chat');
};

const postSignup = async (req, res) => {
  const userObj = {
    name: req.body.sfname + " " + req.body.slname,
    email: req.body.semail,
    password: req.body.spassword
  };
  const newUser = new _User.default(userObj);
  newUser.save();
  res.redirect('/');
};

const destroySession = async (req, res) => {
  req.session.destroy(err => {
    console.log(err);
  });
  return res.redirect('/');
};

let authController = {
  postLogin,
  postSignup,
  destroySession
};
exports.authController = authController;