import { Guest, PrismaClient, User } from '@prisma/client';
import { IUserRepository } from './types/interfaces';
import { CreateGuestInput, CreateUserInput } from './types/types';

export default class UserRepository implements IUserRepository {
  constructor(private readonly client: PrismaClient) {
    this.client = client;
  }
  async getUserById(userId: string): Promise<User | null> {
    return this.client.user.findUnique({
      where: { id: userId },
      include: { eventsAttended: true },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.client.user.findUnique({
      where: { email },
      include: { eventsAttended: true },
    });
  }

  async getUserByPhone(phone: string): Promise<User | null> {
    return this.client.user.findUnique({
      where: { phone },
      include: { eventsAttended: true },
    });
  }

  async searchUsersByName(name: string): Promise<User[]> {
    return this.client.user.findMany({
      where: {
        fullName: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async createUser(userData: CreateUserInput): Promise<User> {
    return this.client.user.create({
      data: userData,
    });
  }

  async createGuest(data: CreateGuestInput): Promise<Guest> {
    return this.client.guest.create({
      data,
    });
  }

  async updateLastLogin(userId: string): Promise<User> {
    return this.client.user.update({
      where: { id: userId },
      data: { lastLogin: new Date(Date.now()) },
    });
  }

  async updateVerificationStatus(userId: string, isVerified: boolean): Promise<User> {
    return this.client.user.update({
      where: { id: userId },
      data: { isVerified },
    });
  }
}
