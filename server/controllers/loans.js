class LoansControllers {
  getAllLoans(req, res) {
    res.status(200).json({
      status: 200,
      data: loans
    });
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   * loan application
   */
  applyLoan(req, res) {
    const {
      email,
      createdOn,
      status,
      repaid,
      tenor,
      amount,
      installment,
      balance,
      interest
    } = req.body;
    const loanApplicant = users.find(_user => _user.userId === req.body.userId);

    const loan = [{}];
    loan.loanId = loans.id;
    loan.email = email;
    loan.createdOn = new Date();
    loan.status = status === "rejected" || "approved";
    loan.repaid = parseFloat(repaid);
    loan.tenor = parseFloat(tenor);
    loan.amount = parseFloat(amount);
    loan.installment = parseFloat(installment);
    loan.balance = parseFloat(balance);
    loan.interest = parseFloat(amount * 5) / 100;

    loan.push(loan);

    const resp = {
      status: 200,
      data: {
        loanId: loans.id,
        email: loans.email,
        createdOn: new Date(),
        status: loanApplicant.status,
        repaid: loans.repaid || true || false,
        tenor: parseFloat(loans.tenor),
        amount: parseFloat(loans.amount),
        installment: parseFloat(loans.installment),
        balance: parseFloat(loans.balance),
        interest: parseFloat(loans.interest)
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

  singleLoan(req, res) {
    const loanDetails = loans.find(
      loan => loan.id === parseInt(req.params.id, 10)
    );
    if (!loanDetails) {
      return res.status(401).json({
        status: 401,
        error: "Loan application not found"
      });
    }
    res.status(200).json({
      status: 200,
      data: loanDetails
    });
  }
}

const loansControllers = new LoansControllers();
export default loansControllers;
