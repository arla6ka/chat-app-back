import { Router } from 'express';
import AuthController from './auth-controller';
import AuthService from './auth-service';
import { authMiddleware } from '../middlewares/auth-middleware';


const authRouter = Router();


const authService = new AuthService();
const authController = new AuthController(authService);


authRouter.post('/register', authController.registerUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have access to this route!' });
});

export default authRouter;
