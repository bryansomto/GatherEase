import { Guest, Organizer, Profile, ROLE, User } from '@prisma/client';
import { SearchEventInput } from '../../../services/types/types';

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  isVerified?: boolean;
  role?: ROLE;
}

export interface CreateGuestInput {
  eventId: string;
  userId: string;
}

export interface CreateOrganizerInput {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role?: ROLE;
}

export interface CreateProfileInput {
  isVerified?: boolean;
  city?: string;
  street?: string;
  organizerId: string;
  jobTitle?: string;
  companyName?: string;
}

export interface CreateVenueInput {
  name: string;
  latitude?: string;
  longitude?: string;
  street: string;
  city: string;
  imageUrl?: string;
  country: string;
}

export interface UpdateVenueInput {
  latitude?: string;
  longitude?: string;
  street?: string;
  city?: string;
  imageUrl?: string;
  country?: string;
}

export interface UpdateOrganizerProfileInput {
  city?: string;
  street?: string;
  organizerId: string;
  jobTitle?: string;
  companyName?: string;
}

export interface CreateEventInput {
  title: string;
  imageUrl?: string;
  description: string;
  venueId: string;
  categoryId: string;
  isPublic?: boolean;
  day: string;
  date: Date;
  city: string;
  organizerId: string;
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  imageUrl?: string;
  venueId?: string;
  categoryId?: string;
  isPublic?: boolean;
  day?: string;
  date?: Date;
  city?: string;
}

export interface CreateGuestInput {
  eventId: string;
  userId: string;
}

export interface CreateTokenInput {
  ownerId: string;
  token: string;
  refreshToken: string;
}

export interface CreateVerifyInput {
  code: string;
  ownerId: string;
}

export interface ImageDataInput {
  ownerId: string;
  imageUrl: string;
  tag: string;
}

export interface SearchEventRepoInput {
  filters: SearchEventInput;
  limit: number;
  page: number;
}

export type OrganizerWithProfile =
  | (Organizer & {
      profile: Profile | null;
    })
  | null;
