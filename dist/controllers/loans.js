"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../db/users"));

var _loans = require("../db/loans");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoansController =
/*#__PURE__*/
function () {
  function LoansController() {
    _classCallCheck(this, LoansController);
  }

  _createClass(LoansController, [{
    key: "getAllLoans",
    value: function getAllLoans(req, res) {
      res.status(200).json({
        status: 200,
        data: _loans.loans
      });
    }
    /**
     *
     * @param {*} req
     * @param {*} res
     * loan application
     */

  }, {
    key: "applyLoan",
    value: function applyLoan(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          createdOn = _req$body.createdOn,
          status = _req$body.status,
          repaid = _req$body.repaid,
          tenor = _req$body.tenor,
          amount = _req$body.amount,
          installment = _req$body.installment,
          balance = _req$body.balance,
          interest = _req$body.interest;

      var loanApplicant = _users["default"].find(function (_user) {
        return _user.userId === req.body.userId;
      });

      var loan = [{}];
      loan.loanId = _loans.loans.id;
      loan.email = email;
      loan.createdOn = new Date();
      loan.status = status === 'rejected' || 'approved';
      loan.repaid = parseFloat(repaid);
      loan.tenor = parseFloat(tenor);
      loan.amount = parseFloat(amount);
      loan.installment = parseFloat(installment);
      loan.balance = parseFloat(balance);
      loan.interest = parseFloat(amount * 5) / 100;
      loan.push(loan);
      var resp = {
        status: 200,
        data: {
          loanId: _loans.loans.id,
          email: _loans.loans.email,
          createdOn: new Date(),
          status: loanApplicant.status,
          repaid: _loans.loans.repaid || true || false,
          tenor: parseFloat(_loans.loans.tenor),
          amount: parseFloat(_loans.loans.amount),
          installment: parseFloat(_loans.loans.installment),
          balance: parseFloat(_loans.loans.balance),
          interest: parseFloat(_loans.loans.interest)
        }
      };
      res.status(200).json(resp);
    }
    /**
     *
     * @param {*} req
     * @param {*} res
     * specific loan
     */

  }, {
    key: "singleLoan",
    value: function singleLoan(req, res) {
      var loanDetails = _loans.loans.find(function (loan) {
        return loan.id === parseInt(req.params.id, 10);
      });

      if (!loanDetails) {
        return res.status(400).json({
          status: 400,
          error: 'Loan application not found'
        });
      }

      res.status(200).json({
        status: 200,
        data: loanDetails
      });
    }
    /**
     *
     * @param {*} req
     * @param {*} res
     * unsettled loans
     */

  }, {
    key: "unSettledLoan",
    value: function unSettledLoan(req, res) {
      var statusReq = req.query.status;
      var repaidReq = req.query.repaid;

      var info = _loans.loans.find(function (loan) {
        return loan.status === statusReq && loan.repaid === repaidReq;
      });

      if (!info) {
        return res.status(403).json({
          status: 403,
          data: 'Loan already settled'
        });
      }

      return res.status(200).json({
        status: 200,
        data: 'Unsettled loan info',
        loans: _loans.loans
      });
    }
    /**
     *
     * @param {*} req
     * @param {*} res
     * fully settled loans
     */

  }, {
    key: "fullySettledLoans",
    value: function fullySettledLoans(req, res) {
      var statusReq = req.query.status;
      var repaidReq = req.query.statusReq;

      var info = _loans.loans.find(function (loan) {
        return loan.status === statusReq && loan.repaid === repaidReq;
      });

      if (!info) {
        return res.status(403).json({
          status: 403,
          data: 'Loan not found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: 'loan fully settled',
        loans: _loans.loans
      });
    }
    /**
     *
     * @param {*} res
     * @param {*} req
     * Loan repayment endpoint
     */

  }, {
    key: "loanRepayment",
    value: function loanRepayment(req, res) {
      var singleLoan = _loans.loans.find(function (loan) {
        return loan.id === parseInt(req.params.id, 10);
      });

      if (!singleLoan) {
        return res.status(403).json({
          status: 403,
          error: "Loan not found"
        });
      }

      var newRepayment = {
        id: _loans.repayments.length + 1,
        loanId: singleLoan.id,
        createdOn: new Date(),
        amount: singleLoan.amount,
        mothlyInstallment: singleLoan.paymentInstallment,
        paidAmount: req.body.paidAmount,
        balance: singleLoan.balance,
        userData: req.userData
      };

      _loans.repayments.push(newRepayment);

      res.status(200).json({
        status: 200,
        data: newRepayment
      });
    }
  }, {
    key: "updatedLoanRepayment",
    value: function updatedLoanRepayment() {
      var id = parseInt(req.params.id, 10);
      var loanFound;
      var loanIndex;

      _loans.loans.map(function (loan, index) {
        if (loan.id === id) {
          loanFound = loan;
          loanIndex = index;
        }
      });

      var updatedLoan = {
        id: loanFound.id,
        createdOn: req.body.createdOn || loanFound.createdOn,
        amount: req.body.amount || loanFound.amount,
        balance: req.body.balance || loanFound.balance
      };

      _loans.loans.splice(loanIndex, 1, updatedLoan);

      return res.status(201).send({
        status: 201,
        data: 'Loan updated successfully',
        updatedLoan: updatedLoan
      });
    }
    /**
     *
     * @param {*} res
     * @param {*} req
     * Loan history endpoint
     */

  }, {
    key: "loanHistory",
    value: function loanHistory(req, res) {
      var loanRepayment = [_loans.loans];

      var lona_history = _loans.loans.filter(function (email) {
        return email;
      });

      res.status(200).json({
        status: 200,
        data: loan
      });
    }
    /**
     *
     * @param {*} res
     * @param {*} req
     * Loan can be approved or rejected
     */

  }, {
    key: "loanStatus",
    value: function loanStatus(req, res) {
      var loanApplication = req.params.loanApplication;

      var loanIndex = _loans.loans.find(function (loan) {
        return loan.loanApplication === loanApplication;
      });

      if (loanIndex < 0) {
        return res.status(403).json({
          status: 403,
          data: 'loan is not valid'
        });
      }

      loanIndex = req.body.status;
      res.status(200).json({
        status: 200,
        data: loanIndex
      });
    }
  }]);

  return LoansController;
}();

var loansController = new LoansController();
var _default = loansController;
exports["default"] = _default;