"use strict";

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

var _user = require("./controllers/user");

var _Group = _interopRequireDefault(require("./models/Group"));

var _Conversation = _interopRequireDefault(require("./models/Conversation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let server = _http.default.createServer(_app.default);

const socketio = require('socket.io');

const io = socketio(server);
const singleChat = io.of('/chat');
singleChat.on('connection', function (singleSocket) {
  let roomName;
  singleSocket.on('join', data => {
    roomName = data.a + " " + data.b;
    singleSocket.join(roomName);
  });
  singleSocket.on("new_msg", async msg => {
    console.log(msg);
    let response = await _user.userController.updateIndividualMessages(msg.senderName, msg.senderID, msg.receiverID, msg.text, 1);

    if (response) {
      console.log('Done');
      singleSocket.broadcast.to(roomName).emit('new_msg', {
        name: msg.senderName,
        text: msg.text
      });
    }
  });
});
const groupChat = io.of('/group-chat');
groupChat.on('connection', function (socket) {
  let groupName;
  socket.on('join', data => {
    groupName = data.groupName;
    socket.join(groupName);
  });
  socket.on("new_msg", async data => {
    console.log(data);
    let response = await _user.userController.updateGroupMessage(data.currentUser.id, data.currentUser.name, data.text);

    if (response) {
      socket.broadcast.to(groupName).emit("new_msg", data);
      console.log('done');
    }
  });
});
server.listen(process.env.PORT, () => {
  console.log(success('Server running on PORT ' + process.env.PORT));
});