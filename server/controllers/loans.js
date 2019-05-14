class LoansControllers {
  getAllLoans(req, res) {
    res.status(200).json({
      status: 200,
      data: loans
    });
  }
}

const loansControllers = new LoansControllers();
export default loansControllers;
