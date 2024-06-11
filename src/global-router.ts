import { Router } from 'express';
import authRouter from './auth/auth-router';
import eventRouter from './events/event-router';


const globalRouter = Router();


globalRouter.use('/auth', authRouter);
globalRouter.use('/events', eventRouter);

export default globalRouter;
