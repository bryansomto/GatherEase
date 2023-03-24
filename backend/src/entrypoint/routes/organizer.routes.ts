import { Router } from 'express';
import * as organizerController from '../controllers/organizer.controller';
import { decodeAccessTokenMiddleware } from '../middleware/auth';
import { grantAccess } from '../middleware/accesscontrol.middleware';

const router = Router();

router.post('/register', organizerController.registerOrganizer);

router.post('/confirmation', organizerController.organizerConfirmation);

router.post('/login', organizerController.organizerLogin);

router.get('/refresh', organizerController.organizerRefreshToken);

router.get(
  '/profile',
  decodeAccessTokenMiddleware,
  grantAccess('readOwn', 'organizerprofile'),
  organizerController.getOrganizerProfile
);

export default router;
