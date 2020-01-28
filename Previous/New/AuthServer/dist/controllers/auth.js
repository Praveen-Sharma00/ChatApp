"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;

var _auth = _interopRequireDefault(require("../services/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _authService = new _auth.default();

const postLogin = async (req, res) => {
  const response = await _authService.loginUser(req.body);
  return res.send(response);
};

const postRegister = async (req, res) => {
  const response = await _authService.registerUser(req.body);
  return res.send(response);
};

const verifyToken = async (req, res) => {
  const response = await _authService.verifyToken(req.body);
  return res.send(response);
};

let authController = {
  postLogin,
  postRegister,
  verifyToken
};
exports.authController = authController;