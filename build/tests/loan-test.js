"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var token = '';
var userToken = '';
var expect = _chai["default"].expect;
describe('Test loan endpoints', function () {
  it("Return all loans ", function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/auth/signin").send({
      email: "admin@quickcredit.com",
      password: "mna.mna"
    }).end(function (err, res) {
      _chai["default"].request(_server["default"]).get("/api/v1/loans").set({
        email: "admin@quickcredit.com",
        password: "1234567"
      }).end(function (error, data) {
        data.should.have.status(200);
        done();
      });
    });
  });
  it("Should post loan application", function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/auth/signin").send({
      email: "admin@quickcredit.com",
      password: "mna.mna"
    }).end(function (err, res) {
      _chai["default"].request(_server["default"]).post("/api/v1/loans/apply").set({
        email: "admin@quickcredit.com",
        password: "1234567"
      }).send({
        tenor: "5",
        amount: 450000.0,
        installment: 10000.0,
        balance: 560000
      }).end(function (error, data) {
        data.should.have.status(403);
        done();
      });
    });
  });
  it("Return specific loan based on it id", function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/auth/signin").send({
      email: "admin@quickcredit.com",
      password: "mna.mna"
    }).end(function (err, res) {
      _chai["default"].request(_server["default"]).post("/api/v1/loans").set({
        email: "admin@quickcredit.com",
        password: "1234567"
      }).send({
        tenor: "3",
        amount: 250000.0,
        installment: 9000.0,
        balance: 360000
      }).end(function (error, data) {
        _chai["default"].request(_server["default"]).get("/api/v1/loans/:id").set({
          email: "admin@quickcredit.com",
          password: "1234567"
        }).end(function (errors, response) {
          response.should.have.status(403);
          done();
        });
      });
    });
  });
  it("Return  all loans that are not fully settled", function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/auth/signin").send({
      email: "admin@quickcredit.com",
      password: "mnpd@123"
    }).end(function (err, res) {
      _chai["default"].request(_server["default"]).get("/api/v1/unrepaid/loans").set({
        email: "admin@quickcredit.com",
        password: "1234567"
      }).query({
        status: "approved",
        repaid: "false"
      }).end(function (error, data) {
        data.should.have.status(404);
        done();
      });
    });
  });
  it("Return loans that are not fully repaid", function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/auth/signin").send({
      email: "mnpde@yahoo.com",
      password: "mnpd@123"
    }).end(function (err, res) {
      _chai["default"].request(_server["default"]).get("/api/v1/repaid/loans").set({
        email: "admin@quickcredit.com",
        password: "1234567"
      }).query({
        status: "approved",
        repaid: "true"
      }).end(function (error, data) {
        data.should.have.status(403);
        done();
      });
    });
  });
  it("Post loan repayment based on it id", function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/auth/signin").send({
      email: "admin@quickcredit.com",
      password: "mnpd@123"
    }).end(function (err, res) {
      _chai["default"].request(_server["default"]).post("/api/v1/loans").set({
        email: "admin@quickcredit.com",
        password: "1234567"
      }).send({
        tenor: "3",
        amount: 250000.0,
        installment: 9000.0,
        balance: 360000
      }).end(function (error, data) {
        _chai["default"].request(_server["default"]).post("/api/v1/loans/:id/repayment").set({
          email: "admin@quickcredit.com",
          password: "1234567"
        }).send({
          paidAmount: 5000.0
        }).end(function (rerrors, response) {
          response.should.have.status(403);
          done();
        });
      });
    });
  });
  it("Should return all loans history", function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/auth/signin").send({
      email: "admin@quickcredit.com",
      password: "mnpd@123"
    }).end(function (err, res) {
      _chai["default"].request(_server["default"]).post("/api/v1/loans").set({
        email: "admin@quickcredit.com",
        password: "1234567"
      }).send({
        tenor: "3",
        amount: 250000.0,
        installment: 9000.0,
        balance: 360000
      }).end(function (error, data) {
        _chai["default"].request(_server["default"]).get("/api/v1/loans/:id/repayment").set({
          email: "admin@quickcredit.com",
          password: "1234567"
        }).end(function (rerrors, response) {
          response.should.have.status(404);
          done();
        });
      });
    });
  });
  it("Should return loan status", function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/auth/signin").send({
      email: "admin@quickcredit.com",
      password: "mnpd@123"
    }).end(function (err, res) {
      _chai["default"].request(_server["default"]).put("/api/v1/loans/:id").set({
        email: "admin@quickcredit.com",
        password: "1234567"
      }).send({
        status: "rejected"
      }).end(function (error, data) {
        data.should.have.status(200);
        done();
      });
    });
  });
});
//# sourceMappingURL=loan-test.js.map