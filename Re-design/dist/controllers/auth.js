"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

var _auth = _interopRequireDefault(require("../services/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postLogin = async (req, res) => {
  res.send('Login');
};

const postSignup = async (req, res) => {
  const _authService = new _auth.default();

  const response = await _authService.createUser(req.body);
  console.log(response);

  if (response.error) {
    return res.send(response.message);
  } else if (response.success) {
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