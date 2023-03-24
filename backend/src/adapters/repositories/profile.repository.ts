import { PrismaClient, Profile } from '@prisma/client';
import { IProfileRepositiory } from './types/interfaces';
import { UpdateOrganizerProfileInput } from './types/types';

export default class ProfileRepository implements IProfileRepositiory {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async getOrganizerProfile(organizerId: string): Promise<Profile | null> {
    return this.client.profile.findUnique({
      where: { organizerId },
    });
  }

  async updateProfileDetails(profileId: string, data: UpdateOrganizerProfileInput): Promise<Profile> {
    return this.client.profile.update({
      where: { id: profileId },
      data,
    });
  }
}
