"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _compression = _interopRequireDefault(require("compression"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

require("./modules/globals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config({
  path: _path.default.join(__dirname, '..', 'config.env')
});

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _compression.default)());
app.use(_express.default.static(_path.default.join(__dirname, '..', 'public'))); // Setting 'view' engine +  directory

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', _path.default.join(__dirname, '..', 'public', 'views'));
var _default = app;
exports.default = _default;