"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth");

var _auth2 = require("../middlewares/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/login').post(_auth.authController.postLogin);
router.route('/signup').post(_auth.authController.postSignup);
router.route('/logout').post(_auth2.authenticate, _auth.authController.destroySession);
let authRoutes = router;
exports.authRoutes = authRoutes;