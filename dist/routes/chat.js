"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboardRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _chat = require("../controllers/chat");

var _auth = require("../controllers/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/group-chat').get(_auth.authController.protectRoute, _chat.dashboardController.groupChat);
router.route('/chat').get(_auth.authController.protectRoute, _chat.dashboardController.chat);
router.route('/dashboard').get(_auth.authController.protectRoute, _chat.dashboardController.dashboard);
let dashboardRoutes = router;
exports.dashboardRoutes = dashboardRoutes;