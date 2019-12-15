"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboardController = void 0;

const dashboard = (req, res) => {
  res.render('group_chat');
};

let dashboardController = {
  chat: dashboard
};
exports.dashboardController = dashboardController;