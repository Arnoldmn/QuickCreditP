"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _users = _interopRequireDefault(require("./routes/users"));

var _loan = _interopRequireDefault(require("./routes/loan"));

var _swagger = _interopRequireDefault(require("./routes/doc/swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 7000;
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.use(_users["default"]);
app.use(_loan["default"]);
app.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Get loans with a good interest'
  });
});
app.listen(PORT, function () {
  console.log("App running on ".concat(PORT));
});
var _default = app;
exports["default"] = _default;