"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../controllers/user");

var _auth = require("../middlewares/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = _express.default.Router();

api.route('/user/contacts').get(_user.userController.getUserContacts).post(_auth.checkSession, _user.userController.updateUserContact);
let apiRoutes = api;
exports.apiRoutes = apiRoutes;