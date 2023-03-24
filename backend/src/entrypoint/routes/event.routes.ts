import { Router } from 'express';
import * as eventController from '../controllers/event.controlller';
import { grantAccess } from '../middleware/accesscontrol.middleware';
import { uploadEventImageMiddleware } from '../middleware/multer.middleware';
const router = Router();

router.post('/', grantAccess('create', 'event'), eventController.createEvent);

router.get('/', grantAccess('readAny', 'event'), eventController.searchEvents);

router.put('/:eventId', grantAccess('updateOwn', 'event'), eventController.updateEvent);

router.delete('/:eventId', grantAccess('deleteOwn', 'event'), eventController.deleteEvent);

router.get('/:eventId', grantAccess('readAny', 'event'), eventController.getEvent);

router.post('/rsvp', grantAccess('createOwn', 'rsvp'), eventController.rsvpToEvent);

router.get('/guestList/:eventId', grantAccess('readOwn', 'guestList'), eventController.getGuestList);

router.post(
  '/upload',
  grantAccess('create', 'eventImage'),
  uploadEventImageMiddleware,
  eventController.uploadEventImage
);

export default router;
