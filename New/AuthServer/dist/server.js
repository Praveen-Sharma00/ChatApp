"use strict";

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = _http.default.createServer(_app.default);

const io = require('socket.io')(server);

io.on('connection', socket => {
  let roomName = '';
  socket.on('join', data => {
    if (data.type === "individual") {
      let a = data.sender._id;
      let b = data.receiver._id;
      if (a > b) [a, b] = [b, a];
      roomName = a + "," + b;
    } else if (data.type === "group") {
      roomName = data.receiver._id + "";
    }

    console.log("NEW ROOM : ", roomName);
    socket.join(roomName);
  });
  socket.on('new_message', function (data) {
    socket.broadcast.to(data.room.name).emit('new_message', {
      room: data.room,
      sender: data.sender,
      text: data.text
    });
    console.log("NEW_MSG : ", data);
  });
  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
server.listen(process.env.PORT, () => {
  console.log(success("Server listening on PORT " + process.env.PORT));
});