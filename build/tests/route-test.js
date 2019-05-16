"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Test if routes exist', function () {
  it('/GET should return 200 and a message', function (done) {
    _chai["default"].request(_server["default"]).get('/').end(function (req, res) {
      expect(res).to.have.status(200);
      expect(res.body.message).to.be.equal('Get loans with a good interest');
      done();
    });
  });
});
//# sourceMappingURL=route-test.js.map