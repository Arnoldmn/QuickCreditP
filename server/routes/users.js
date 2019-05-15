import express from "express";
import loansController from "../controllers/loans";
import usersController from "../controllers/users";
import authorize from "../middleware/authorize";

const router = express.Router();

/**
 * Users routes
 */
router.get("/api/v1/users", authorize, usersController.getAllUsers);
router.get("api/v1/loans/hostory", authorize, loansController.loanHistory);
router.post("/api/v1/auth/signup", usersController.signup);
router.post("/api/v1/auth/signin", usersController.signin);
router.put(
  "/api/v1/users/:email/verify",
  authorize,
  usersController.UserIsVerified
);

export default router;
