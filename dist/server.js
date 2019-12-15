"use strict";

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let server = _http.default.createServer(_app.default);

const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('Someone connected');
  socket.on('user_connected', user => {
    console.log(user.name + " is connected");
  });
  socket.on('new_message', data => {
    console.log(data); // console.log(text)
  });
});
server.listen(process.env.PORT, () => {
  console.log(success('Server running on PORT ' + process.env.PORT));
});