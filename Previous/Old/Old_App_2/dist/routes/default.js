"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _default = require("../controllers/default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/').get(_default.defaultController.home);
let defaultRoutes = router;
exports.defaultRoutes = defaultRoutes;