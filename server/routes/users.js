import express from 'express';
import usersController from '../controllers/users';

const router = express.Router();

router.get('/api/v1/users', usersController.getAllUsers);
router.post('/api/v1/auth/signup', usersController.signup);

export default router;
