import { Router } from 'express';
import EventController from './event-controller';
import EventService from './event-service';
import { authMiddleware } from '../middlewares/auth-middleware';

const eventRouter = Router();

const eventService = new EventService();
const eventController = new EventController(eventService);

eventRouter.get('/', authMiddleware, eventController.getEvents);
eventRouter.post('/', eventController.createEvent);
eventRouter.get('/:id', eventController.getEventById);

export default eventRouter;
