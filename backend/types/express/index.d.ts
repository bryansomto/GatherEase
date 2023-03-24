import { User, Organizer } from '@prisma/client';

declare global {
  declare namespace Express {
    export interface Request {
      user: Organizer | User;
    }
  }
}
