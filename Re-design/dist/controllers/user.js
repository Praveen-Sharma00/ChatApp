"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

const dashboard = async (req, res) => {
  res.render('dashboard');
};

let userController = {
  dashboard
};
exports.userController = userController;