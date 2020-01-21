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
  socket.on('new_message', data => {
    console.log("REC : ", data);
    socket.broadcast.emit('new-message', data);
  });
  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });
});
server.listen(process.env.PORT, () => {
  console.log(success("Server listening on PORT " + process.env.PORT));
});