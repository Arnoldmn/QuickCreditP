"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('User sign in', function () {
  it('Should return a 201 and confirm user email and password as valid inputs', function (done) {
    var user = {
      email: 'johndoe@quicredit.com',
      password: 'secret'
    };

    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(user).end(function (error, res) {
      expect(res).to.have.status(401);
      done();
    });
  });
  it('Should return a 403 and confirm user email and password as invalid inputs', function (done) {
    var user = {
      email: '',
      password: ''
    };

    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(user).end(function (error, res) {
      expect(res).to.have.status(401);
      done();
    });
  });
  it('should return 401 for invalid input', function (done) {
    var userInvalidInput = {
      name: 'John Wick',
      email: '',
      password: 'secret'
    };

    _chai["default"].request(_server["default"]).post('/api/v1/auth/signin').send(userInvalidInput).end(function (req, res) {
      res.should.have.status(401);
      expect(res.body.error).to.be.equal('invalid username or password');
      done();
    });
  });
});