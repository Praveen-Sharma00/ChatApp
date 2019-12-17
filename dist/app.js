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

var _chat = require("./routes/chat");

var _user = require("./routes/user");

var _Conversation = _interopRequireDefault(require("./models/Conversation"));

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
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.json());
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
/************************ROUTE MIDDLEWARES***************************** */

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
});
app.get('/sample', async (req, res) => {
  const c = new _Conversation.default({
    between_users: [_mongoose.default.Types.ObjectId("5df85c4c21627c11e1cbbb1a"), _mongoose.default.Types.ObjectId("5df85c7521627c11e1cbbb1c")],
    conversation_type: 1,
    messages: [{
      text: 'Hello amit',
      sender: {
        id: _mongoose.default.Types.ObjectId("5df85c4c21627c11e1cbbb1a"),
        name: "Praveen"
      },
      timestamp: 13132434234
    }]
  });
  await c.save();
});
app.use(_default2.defaultRoutes);
app.use(_auth.authRoutes);
app.use(_chat.dashboardRoutes);
app.use(_user.userRoutes);
/********************************************************************* */

var _default = app;
exports.default = _default;