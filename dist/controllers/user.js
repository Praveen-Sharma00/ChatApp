"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

const getCurrentUser = (req, res) => {
  res.send({
    id: req.session.user._id,
    name: req.session.user.name,
    email: req.session.user.email
  });
};

let userController = {
  getCurrentUser: getCurrentUser
};
exports.userController = userController;