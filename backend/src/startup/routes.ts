import { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import userRoutes from '../entrypoint/routes/user.routes';
import organizerRoutes from '../entrypoint/routes/organizer.routes';
import eventRoutes from '../entrypoint/routes/event.routes';
import guestRoutes from '../entrypoint/routes/guest.routes';
import { decodeAccessTokenMiddleware } from '../entrypoint/middleware/auth';

export default function routeSetup(app: Application) {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req: Request, res: Response) => res.status(200).json({ message: 'Welcome to GatherEase API' }));
  app.get('/api/v1', (req: Request, res: Response) =>
    res.status(200).json({ message: 'Welcome to GatherEase API v1' })
  );

  app.use('/api/v1/user', userRoutes);

  app.use('/api/v1/organizer', organizerRoutes);

  app.use(decodeAccessTokenMiddleware);

  app.use('/api/v1/event', eventRoutes);

  app.use('/api/v1/guest', guestRoutes);
}
