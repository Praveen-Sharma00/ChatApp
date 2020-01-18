"use strict";

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import UserDetailService from "./services/user";
//
// const _userDetailService = new UserDetailService()
const server = _http.default.createServer(_app.default);

const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('Someone connected !');
});
server.listen(process.env.PORT, () => {
  console.log(success("Server listening on PORT " + process.env.PORT));
});