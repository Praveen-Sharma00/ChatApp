"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashboardController = void 0;

const dashboard = (req, res) => {
  res.render('dashboard');
};

const groupChat = (req, res) => {
  res.render('group_chat');
};

const chat = (req, res) => {
  res.render('chat');
};

let dashboardController = {
  chat: chat,
  groupChat: groupChat,
  dashboard: dashboard
};
exports.dashboardController = dashboardController;