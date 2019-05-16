"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var checkHeader = req.headers.authorization;

  if (typeof checkHeader !== 'undefined') {
    var bearer = checkHeader.split(' ');
    var token = bearer[1];

    _jsonwebtoken["default"].verify(token, 'secretkey', function (err, encoded) {
      if (err) {
        res.status(401).json({
          status: 401,
          data: 'Unauthorized access'
        });
      }

      req.encoded = encoded;
      next();
    });
  } else {
    res.status(403).json();
  }
};

var _default = verifyToken;
exports["default"] = _default;