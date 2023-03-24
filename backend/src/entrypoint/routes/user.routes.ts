import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { decodeAccessTokenMiddleware } from '../middleware/auth';
import { grantAccess } from '../middleware/accesscontrol.middleware';

const router = Router();

router.post('/register', userController.registerUser);

router.post('/confirmation', userController.userConfirmation);

router.post('/login', userController.userLogin);

router.get('/refresh', userController.userRefreshToken);

router.get(
  '/profile',
  decodeAccessTokenMiddleware,
  grantAccess('readOwn', 'userprofile'),
  userController.getUserProfile
);
export default router;
