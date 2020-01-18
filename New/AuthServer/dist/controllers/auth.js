"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

var _auth = _interopRequireDefault(require("../services/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _authService = new _auth.default();

const postLogin = async (req, res) => {
  console.log(req.body);
  const response = await _authService.loginUser(req.body);
  console.log(response);
  return res.send(response);
};

const postRegister = async (req, res) => {
  const response = await _authService.registerUser(req.body);
  return res.send(response);
};

let authController = {
  postLogin,
  postRegister
};
exports.authController = authController;