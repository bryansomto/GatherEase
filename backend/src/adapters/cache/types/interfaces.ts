import { Organizer, User } from '@prisma/client';

export interface IRedisClient {
  setUser(token: string, user: User | Organizer): Promise<boolean>;

  retrieveUser(token: string): Promise<User | Organizer | null>;
}
