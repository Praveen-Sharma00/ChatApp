"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.log = console.log;
global.red = _chalk.default.red;
global.green = _chalk.default.green;
global.yellow = _chalk.default.yellow;
global.success = green.bold.underline;
global.warning = yellow.bold;
global.error = red.bold;