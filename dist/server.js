"use strict";

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let server = _http.default.createServer(_app.default);

const socketio = require('socket.io');

const io = socketio(server);
const singleChat = io.of('/chat');
singleChat.on('connection', function (singleSocket) {
  let roomName;
  console.log('Someone connected');
  singleSocket.on('join', data => {
    roomName = data.a + " " + data.b;
    singleSocket.join(roomName);
  });
  singleSocket.on("new_msg", data => {
    console.log(data);
    singleSocket.broadcast.to(roomName).emit('new_msg', data.text); // singleSocket.broadcast.to(roomName).emit('new_msg',data.text)
  });
});
io.on('connection', socket => {
  socket.on('join', data => {
    console.log(data.name + " is Online !");
    socket.join("fun");
  });
  socket.on("new_msg", data => {
    socket.broadcast.to("fun").emit('new_msg', data);
  });
});
server.listen(process.env.PORT, () => {
  console.log(success('Server running on PORT ' + process.env.PORT));
});