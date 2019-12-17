"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("../controllers/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/user').get(_user.userController.getCurrentUser);
router.route('/contact').post(_user.userController.addContact);
router.route('/contacts').get(_user.userController.getContacts);
router.route('/group').post(_user.userController.addGroup);
router.route('/chats').post(_user.userController.getChats);
let userRoutes = router;
exports.userRoutes = userRoutes;