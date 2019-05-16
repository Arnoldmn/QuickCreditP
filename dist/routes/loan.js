"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _loans = _interopRequireDefault(require("../controllers/loans"));

var _authorize = _interopRequireDefault(require("../middleware/authorize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import usersController from '../controllers/users';
var router = _express["default"].Router();
/**
 *
 * loan routes
 */


router.get('/api/v1/loans', _loans["default"].getAllLoans);
router.get('/api/v1/loans/:id', _authorize["default"], _loans["default"].singleLoan);
router.get('/api/v1/unpaid/loans', _authorize["default"], _loans["default"].unSettledLoan);
router.get('/api/v1/repaid/loans', _authorize["default"], _loans["default"].fullySettledLoans);
router.get('/api/v1/loans/repayment', _authorize["default"], _loans["default"].loanHistory);
router.post('/api/v1/loans/apply', _authorize["default"], _loans["default"].applyLoan);
router.post('/api/v1/loans/:id/repayment', _loans["default"].loanRepayment);
router.post('/api/v1/loans/loansHistory', _authorize["default"], _loans["default"].loanHistory);
router.put('/api/v1/loans/:id', _loans["default"].loanStatus);
router.patch('/api/v1/loans/:id', _authorize["default"], _loans["default"].updatedLoanRepayment);
var _default = router;
exports["default"] = _default;