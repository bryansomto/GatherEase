import { Router } from 'express';
import { grantAccess } from '../middleware/accesscontrol.middleware';
import * as eventController from '../controllers/event.controlller';

const router = Router();

router.get('/:guestId', grantAccess('readOwn', 'guest'), eventController.getGuest);

router.delete('/:guestId', grantAccess('deleteOwn', 'guest'), eventController.deleteGuest);

router.post('/markAttended', grantAccess('updateOwn', 'guest'), eventController.markGuestAsAttended);
export default router;
