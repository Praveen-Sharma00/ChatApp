"use strict";

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

var _user = _interopRequireDefault(require("./services/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _userDetailService = new _user.default();

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
  socket.on('new_message', async function (data) {
    let res = '';

    if (data.room.type === "individual") {
      res = await _userDetailService.updateIndividualConversation(data.room, data.sender, data.receiver, data.text, data.message_type, data.media);
    } else if (data.type === "group") {
      res = await _userDetailService.updateGroupConversation(data.room, data.sender, data.receiver, data.text, data.message_type, data.media);
    }

    console.log("RESPONSE : ", res);
    socket.broadcast.to(data.room.name).emit('new_message', {
      room: data.room,
      sender: data.sender,
      text: data.text
    });
  });
  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});
server.listen(process.env.PORT, () => {
  console.log(success("Server listening on PORT " + process.env.PORT));
});