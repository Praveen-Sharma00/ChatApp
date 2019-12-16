"use strict";

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let server = _http.default.createServer(_app.default);

const socketio = require('socket.io');

const io = socketio(server);
io.on('connection', socket => {
  // socket.on('user_connected',(data)=>{
  //     console.log(data + " is online! ")
  //     socket.join("fun")
  // })
  // socket.on("new_msg",(text)=>{
  //     socket.broadcast.to("fun").emit("new_msg",text)
  // })
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