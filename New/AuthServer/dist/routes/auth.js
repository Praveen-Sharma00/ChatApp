"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/login').post(_auth.authController.postLogin);
router.route('/register').post(_auth.authController.postRegister);
let authRoutes = router;
exports.authRoutes = authRoutes;