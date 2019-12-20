"use strict";

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = _http.default.createServer(_app.default);

const socketio = require('socket.io');

const io = socketio(server);
server.listen(process.env.PORT, () => {
  console.log(success("Server listening on PORT " + process.env.PORT));
});