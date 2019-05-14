import express from "express";
import loansController from "../controllers/loans";
import usersController from "../controllers/users";
const router = express.Router();

/**
 *
 * loan routes
 */
router.get("/api/v1/loans", loansController.getAllLoans);
router.get("/api/v1/loans/:id", loansController.singleLoan);
router.get("/api/v1/unpaid/loans", loansController.unSettledLoan);
router.get("/api/v1/repaid/loans", loansController.fullySettledLoans);

router.get("/api/v1/loans/repayment", loansController.loanHistory);
router.post("/api/v1/loans/apply", loansController.applyLoan);
router.post("/api/v1/loans/:id/repayment", loansController.loanRepayment);
router.put("/api/v1/loans/:id", loansController.loanStatus);
router.patch("/api/v1/loans/:id", loansController.singleLoan);

export default router;
