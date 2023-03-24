import { Organizer, User } from '@prisma/client';
import { createClient } from 'redis';
import logger from '../../startup/logging';
import { RedisClientType } from './types/types';
import { IRedisClient } from './types/interfaces';

export default class RedisClient implements IRedisClient {
  client: RedisClientType;

  constructor(client: RedisClientType) {
    this.client = client;
  }

  /**
   * Stores user object in redis
   * @param token
   * @param user
   */
  async setUser(token: string, user: User | Organizer): Promise<boolean> {
    try {
      await this.client.set(token, JSON.stringify(user));
      logger.info('user set');
      return true;
    } catch (error) {
      logger.error(error, 'Cannot set user in redis');

      return false;
    }
  }

  async retrieveUser(token: string): Promise<User | Organizer | null> {
    const user = await this.client.get(token);

    if (!user) return null;

    return JSON.parse(user);
  }
}
