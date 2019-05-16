"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _users = _interopRequireDefault(require("../db/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, [{
    key: "getAllUsers",
    value: function getAllUsers(req, res) {
      res.status(200).json({
        status: 200,
        data: _users["default"]
      });
    }
  }, {
    key: "signup",
    value: function signup(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstname = _req$body.firstname,
          lastname = _req$body.lastname,
          password = _req$body.password,
          address = _req$body.address,
          status = _req$body.status,
          isAdmin = _req$body.isAdmin;

      var userExists = _users["default"].find(function (user) {
        return user.email === email;
      });

      if (userExists) {
        res.status(409).json({
          status: 409,
          error: 'User already exists'
        });
      }

      var user = {};
      user.id = _users["default"].length + 1;
      user.email = email;
      user.firstname = firstname;
      user.lastname = lastname;
      user.password = password;
      user.address = address;
      user.status = 'pending' || 'approved';
      user.isAdmin = true || false;

      _users["default"].push(user);

      _jsonwebtoken["default"].sign({
        userId: _users["default"].id,
        email: _users["default"].email,
        password: _users["default"].password
      }, 'secretkey', function (error, token) {
        if (error) {
          return res.status(401).json({
            status: 401,
            data: 'user already exits'
          });
        }

        user.token = token;
        var resp = {
          status: 200,
          data: {
            token: user.token,
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
            address: user.address,
            status: user.status === 'rejected' || 'approved',
            isAdmin: user.isAdmin === true || false
          }
        };
        res.status(200).json(resp);
      });
    }
  }, {
    key: "signin",
    value: function signin(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      var user = _users["default"].find(function (user) {
        return user.email === email && user.password === password;
      });

      if (!user) {
        res.status(401).json({
          status: 401,
          token: null,
          auth: false,
          error: 'invalid username or password'
        });
      }

      _jsonwebtoken["default"].sign({
        userId: _users["default"].id,
        email: _users["default"].email,
        password: _users["default"].password
      }, 'secretkey', function (error, token) {
        if (error) {
          return res.status(401).json({
            status: 401,
            data: 'user doesnt exit'
          });
        }

        user.token = token;
        var resp = {
          status: 201,
          data: {
            token: token,
            userId: _users["default"].id,
            firstName: _users["default"].firstName,
            lastname: _users["default"].lastName
          }
        };
        res.status(201).json(resp);
      });
    }
  }, {
    key: "UserIsVerified",
    value: function UserIsVerified(req, res) {
      var user = _users["default"].find(function (user) {
        return user.email === req.params.email;
      });

      if (!user) {
        return res.status(201).json({
          status: 404,
          error: 'User not found'
        });
      }

      singleUser.status = req.body.status;
      var resp = {
        email: _users["default"].email,
        firstname: _users["default"].firstname,
        lastname: _users["default"].lastname,
        address: _users["default"].address,
        status: _users["default"].status
      };
      return res.status(200).json({
        status: 200,
        data: resp
      });
    }
  }]);

  return UsersController;
}();

var usersController = new UsersController();
var _default = usersController;
exports["default"] = _default;
//# sourceMappingURL=users.js.map