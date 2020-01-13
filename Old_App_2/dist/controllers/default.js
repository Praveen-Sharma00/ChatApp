"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultController = void 0;

const home = (req, res) => {
  res.render('index');
};

let defaultController = {
  home: home
};
exports.defaultController = defaultController;