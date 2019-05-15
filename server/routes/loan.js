import express from "express";
import loansController from "../controllers/loans";
import usersController from "../controllers/users";
import authorize from "../middleware/authorize";
const router = express.Router();

/**
 *
 * loan routes
 */
router.get("/api/v1/loans", loansController.getAllLoans);
router.get("/api/v1/loans/:id", authorize, loansController.singleLoan);
router.get("/api/v1/unpaid/loans", authorize, loansController.unSettledLoan);
router.get(
  "/api/v1/repaid/loans",
  authorize,
  loansController.fullySettledLoans
);

router.get("/api/v1/loans/repayment", authorize, loansController.loanHistory);
router.post("/api/v1/loans/apply", authorize, loansController.applyLoan);
router.post("/api/v1/loans/:id/repayment", loansController.loanRepayment);
router.post(
  "/api/v1/loans/loansHistory",
  authorize,
  loansController.loanHistory
);
router.put("/api/v1/loans/:id", loansController.loanStatus);
router.patch(
  "/api/v1/loans/:id",
  authorize,
  loansController.updatedLoanRepayment
);

export default router;
