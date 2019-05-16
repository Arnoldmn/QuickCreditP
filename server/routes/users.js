import express from 'express';
// import loansController from '../controllers/loans';
import usersController from '../controllers/users';

const router = express.Router();

/**
 * Users routes
 */
router.get('/api/v1/users', usersController.getAllUsers);
// router.get('api/v1/loans/history', loansController.loanHistory);
router.post('/api/v1/auth/signup', usersController.signup);
// router.post('/api/v1/auth/signin', usersController.signin);
// router.put('/api/v1/users/:email/verify', usersController.UserIsVerified);

export default router;
