"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _loans = _interopRequireDefault(require("../controllers/loans"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _authorize = _interopRequireDefault(require("../middleware/authorize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/**
 * Users routes
 */


router.get('/api/v1/users', _users["default"].getAllUsers);
router.get('api/v1/loans/history', _authorize["default"], _loans["default"].loanHistory);
router.post('/api/v1/auth/signup', _users["default"].signup);
router.post('/api/v1/auth/signin', _users["default"].signin);
router.put('/api/v1/users/:email/verify', _authorize["default"], _users["default"].UserIsVerified);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=users.js.map