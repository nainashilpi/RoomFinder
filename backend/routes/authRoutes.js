//Router for authentication routes
import { Router } from 'express';
import * as authController from '../controllers/authController.js';

// Create a new router instance
const authRouter = Router();
 
/**
 * POST /api/auth/register
 * Register a new user
*/

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);


export default authRouter;