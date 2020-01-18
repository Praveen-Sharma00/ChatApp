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

require("./utils/globals");

var _auth = require("./routes/auth");

var _api = require("./routes/api");

var _fileFilters = require("./utils/fileFilters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const multer = require('multer');

_dotenv.default.config({
  path: _path.default.join(__dirname, '..', 'config.env')
});

const app = (0, _express.default)();
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, _path.default.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, "file" + '-' + Date.now() + _path.default.extname(file.originalname));
  }
});
let uploadFile = multer({
  storage: storage,
  fileFilter: _fileFilters.Filter
});

_mongoose.default.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, () => {
  console.log(success('Database connection established !'));
});

app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use((0, _compression.default)());
/************************ROUTE MIDDLEWARES***************************** */

app.use(_auth.authRoutes);
app.use('/api/v1', _api.apiRoutes);
/************************************** UPLOAD HANDLER ***************************************/

app.post('/upload', uploadFile.array('media', 10), (req, res) => {
  const files = req.files;
  let media_type = [];
  let filename = [];

  for (let i = 0; i < files.length; i++) {
    let ext = files[i].filename.split('.')[1];
    filename.push(req.files[i].filename);

    if (ext === "jpg" || ext === "JPG" || ext === "jpeg" || ext === "JPEG" || ext === "png" || ext === "PNG" || ext === "gif" || ext === "GIF") {
      media_type.push("image");
    } else if (ext === "pdf" || ext === "PDF") {
      media_type.push("pdf");
    } else {
      media_type.push("doc");
    }
  }

  res.send({
    success: true,
    filename: filename,
    media_type: media_type
  });
});
var _default = app;
exports.default = _default;