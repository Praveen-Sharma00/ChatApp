"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.static(_path.default.join(__dirname, '..', 'public')));
app.engine('html', require('ejs').renderFile);
app.set('views', _path.default.join(__dirname, '..', 'public', 'views'));
app.set('view engine', 'html');
app.get('/', (req, res) => {
  res.render('index');
});
var _default = app;
exports.default = _default;