"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _compression = _interopRequireDefault(require("compression"));

var _path = _interopRequireDefault(require("path"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./modules/globals");

var _default2 = require("./routes/default");

var _auth = require("./routes/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config({
  path: _path.default.join(__dirname, '..', 'config.env')
});

const app = (0, _express.default)();

_mongoose.default.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, () => {
  console.log(success('Database connection established !'));
});

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

const expressStore = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: 'sessions'
});
app.use((0, _cors.default)());
app.use((0, _compression.default)());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'CloudSurfer',
  store: expressStore
}));
app.use(_express.default.static(_path.default.join(__dirname, '..', 'public'))); // Setting 'view' engine +  directory

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', _path.default.join(__dirname, '..', 'public', 'views'));
app.use(_default2.defaultRoutes);
app.use(_auth.authRoutes);
var _default = app;
exports.default = _default;