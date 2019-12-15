"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboardRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _chat = require("../controllers/chat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/group-chat').get(_chat.dashboardController.chat);
let dashboardRoutes = router;
exports.dashboardRoutes = dashboardRoutes;