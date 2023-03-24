import { Guest, PrismaClient, User, Event } from '@prisma/client';
import { IGuestRepository } from './types/interfaces';
import { DeleteGuestError } from './exceptions';
import { CreateGuestInput } from './types/types';

export default class GuestRepository implements IGuestRepository {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async getGuest(guestId: string): Promise<(Guest & { user: User; event: Event }) | null> {
    return this.client.guest.findUnique({
      where: { id: guestId },
      include: {
        user: true,
        event: true,
      },
    });
  }

  async getGuestByEventAndUser(eventId: string, userId: string): Promise<Guest | null> {
    return this.client.guest.findUnique({
      where: {
        user_event: {
          userId,
          eventId,
        },
      },
    });
  }

  async deleteGuest(guestId: string): Promise<void> {
    try {
      await this.client.guest.delete({
        where: {
          id: guestId,
        },
      });
    } catch (error: any) {
      throw new DeleteGuestError(error.message);
    }
  }

  async createGuest(data: CreateGuestInput): Promise<Guest> {
    return this.client.guest.create({
      data,
    });
  }

  async markGuestAsAttended(guestId: string): Promise<Guest> {
    return this.client.guest.update({
      where: { id: guestId },
      data: {
        attended: true,
      },
    });
  }

  async retrieveGuestList(eventId: string): Promise<(Guest & { user: User })[]> {
    return this.client.guest.findMany({
      where: {
        eventId,
      },
      include: {
        user: true,
      },
    });
  }
}
