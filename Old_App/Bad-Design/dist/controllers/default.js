"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultController = void 0;

const main = (req, res) => {
  res.render('index');
};

let defaultController = {
  main: main
};
exports.defaultController = defaultController;