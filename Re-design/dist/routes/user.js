"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../controllers/user");

var _auth = require("../middlewares/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/dashboard').get(_auth.checkSession, _user.userController.dashboard);
router.route('/chat').get(_auth.checkSession, _user.userController.chat);
let userRoutes = router;
exports.userRoutes = userRoutes;