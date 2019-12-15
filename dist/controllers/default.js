"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultController = void 0;

const main = (req, res) => {
  res.redirect('/login');
};

let defaultController = {
  main: main
};
exports.defaultController = defaultController;