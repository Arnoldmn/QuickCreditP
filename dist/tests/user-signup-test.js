"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('User sign up', function () {
  it('Should return a 201 and confirm user valid input', function (done) {
    /**
     * request new user input
     */
    var newUser = {
      email: 'johndoe@quicredit.com',
      firstname: 'john',
      lastname: 'doe',
      password: 'secret',
      address: 'Gisozi'
    };
    /**
     * send  user request
     */

    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(newUser).end(function (_data, res) {
      expect(res.body.data).to.have.property('email');
      expect(res.body.data).to.have.property('firstname');
      expect(res.body.data).to.have.property('lastname');
      expect(res.body.data).to.have.property('password');
      expect(res.body.data).to.have.property('address');
      expect(res.body.data).to.have.property('status');
      done();
    });
  });
  it('Should return error 401 when email is already registered', function (done) {
    var newUser = {
      email: 'johndoe@quicredit.com',
      firstname: 'john',
      lastname: 'doe',
      password: 'secret',
      address: 'Gisozi'
    };

    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send(newUser).end(function (req, res) {
      expect(res).to.have.status(409);
      expect(res.body.error).to.be.equal('User already exists');
      done();
    });
  });
});