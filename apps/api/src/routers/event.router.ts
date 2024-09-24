import { EventController } from '@/controllers/event.controller';
import { verifyToken } from '@/middlewares/token';
import { uploader } from '@/middlewares/uploader';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/createEvent',
      uploader('event-', '/event').single('image'),
      verifyToken,
      this.eventController.createEvent,
    );
    this.router.post(
      '/updateEvent',
      verifyToken,
      this.eventController.updateEvent,
    );
    this.router.get('/events', this.eventController.getEvents);
    this.router.get('/myevents', this.eventController.getMyEvents);
    this.router.get('/events/:slug', this.eventController.getEventSlug);
    this.router.get(
      '/registration/:organizerId',
      verifyToken,
      this.eventController.getRegistration,
    );
    this.router.post('/buy', verifyToken, this.eventController.buyTicket);
    this.router.get(
      '/tikets/:userId',
      verifyToken,
      this.eventController.getTikets,
    );
    this.router.get(
      '/dashboard/:userId/:year',
      verifyToken,
      this.eventController.getDashboard,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
