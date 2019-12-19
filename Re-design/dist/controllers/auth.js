"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

var _auth = _interopRequireDefault(require("../services/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _authService = new _auth.default();

const postLogin = async (req, res) => {
  const response = await _authService.findUser(req.body);

  if (!response.success) {
    return res.send(response.error.message);
  } else {
    req.session.isLoggedIn = true;
    req.session.user = response.data.user;
    return res.redirect('/dashboard');
  }
};

const postSignup = async (req, res) => {
  const response = await _authService.createUser(req.body);

  if (!response.success) {
    return res.send(response.error.message);
  } else {
    return res.redirect('/');
  }
};

const destroySession = async (req, res) => {
  res.send('Destroy');
};

let authController = {
  postLogin,
  postSignup,
  destroySession
};
exports.authController = authController;