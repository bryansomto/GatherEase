import { Organizer, PrismaClient, Profile } from '@prisma/client';
import { IOrganizerRepository } from './types/interfaces';
import { CreateOrganizerInput, CreateProfileInput, OrganizerWithProfile } from './types/types';

export default class OrganizerRepository implements IOrganizerRepository {
  private client;

  constructor(prismaClient: PrismaClient) {
    this.client = prismaClient;
  }

  async getOrganizerById(organizerId: string): Promise<Organizer | null> {
    return this.client.organizer.findUnique({
      where: { id: organizerId },
      include: { profile: true },
    });
  }

  async getOrganizerFullProfile(organizerId: string): Promise<OrganizerWithProfile> {
    return this.client.organizer.findUnique({
      where: { id: organizerId },
      include: { profile: true },
    });
  }

  async getOrganizerByEmail(email: string): Promise<Organizer | null> {
    return this.client.organizer.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async getOrganizerByPhone(phone: string): Promise<Organizer | null> {
    return this.client.organizer.findUnique({
      where: { phone },
      include: { profile: true },
    });
  }

  async searchOrganizersByName(name: string): Promise<Organizer[]> {
    return this.client.organizer.findMany({
      where: {
        fullName: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async createOrganizer(organizerData: CreateOrganizerInput): Promise<Organizer> {
    // return this.client.organizer.create({
    //   data: organizerData,
    // });
    return this.client.$transaction(async (prisma) => {
      const newOrganizer = await prisma.organizer.create({
        data: organizerData,
      });

      await prisma.profile.create({
        data: { organizerId: newOrganizer.id },
      });

      return newOrganizer;
    });
  }

  async createProfile(data: CreateProfileInput): Promise<Organizer> {
    return this.client.$transaction(async (prisma) => {
      const profile: Profile = await prisma.profile.create({
        data: data,
      });

      return prisma.organizer.update({
        where: { id: profile.id },
        data: {
          profileId: profile.id,
        },
        include: { profile: true },
      });
    });
  }

  async updateVerificationStatus(organizerId: string, isVerified: boolean): Promise<Profile> {
    return this.client.profile.update({
      where: { organizerId },
      data: { isVerified },
    });
  }

  async updateLastLogin(organizerId: string): Promise<Organizer> {
    return this.client.organizer.update({
      where: { id: organizerId },
      data: { lastLogin: new Date(Date.now()) },
    });
  }
}
