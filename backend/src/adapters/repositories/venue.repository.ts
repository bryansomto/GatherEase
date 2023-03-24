import { PrismaClient, Venue } from '@prisma/client';
import { IVenueRepository } from './types/interfaces';
import { CreateVenueInput, UpdateVenueInput } from './types/types';
import { DeleteVenueError } from './exceptions';

export default class VenueRepository implements IVenueRepository {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async createVenue(data: CreateVenueInput): Promise<Venue> {
    return this.client.venue.create({
      data,
    });
  }

  async updateVenue(venueId: string, data: UpdateVenueInput): Promise<Venue> {
    return this.client.venue.update({
      where: { id: venueId },
      data,
    });
  }

  async deleteVenue(venueId: string): Promise<boolean> {
    try {
      await this.client.venue.delete({
        where: { id: venueId },
      });

      return true;
    } catch (error: any) {
      throw new DeleteVenueError(error.message);
    }
  }

  async getVenueById(venueId: string): Promise<Venue | null> {
    return this.client.venue.findUnique({
      where: { id: venueId },
    });
  }

  async searchVenuesByName(name: string, limit = 10): Promise<Venue[]> {
    return this.client.venue.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      take: limit,
    });
  }

  async searchVenuesByCity(city: string, limit = 10): Promise<Venue[]> {
    return this.client.venue.findMany({
      where: {
        city: {
          contains: city,
          mode: 'insensitive',
        },
      },
      take: limit,
    });
  }
}
