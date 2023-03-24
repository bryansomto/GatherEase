import { Event, Organizer, Profile, ROLE, User } from '@prisma/client';

export interface UserRegistrationInput {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserAuthenticationInput {
  email: string;
  phone?: string;
  password: string;
}

export interface UserConfirmationInput {
  code: string;
  phone: string;
}

export interface OrganizerConfirmationInput {
  code: string;
  phone: string;
}

export interface OrganizerRegistrationInput {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  password: string;
}

export interface OrganizerLoginInput {
  email: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface RefreshOrganizerInput {
  ownerId: string;
  refreshToken: string;
  role: ROLE;
}

export interface AuthenticateOrganizerOutput {
  accessToken: string;
  refreshToken: string;
  organizer: Organizer;
}

export interface AuthenticateUserOutput {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface CreateEventInput {
  organizer: Organizer;
  imageUrl?: string;
  title: string;
  description: string;
  venueId: string;
  categoryId: string;
  isPublic: boolean;
  day: string;
  date: Date;
  city: string;
}
export interface EventImageInput {
  organizer: Organizer;
  image: Express.Multer.File;
}

export interface UpdateEventInputData {
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
export interface UpdateEventInput {
  eventId: string;
  organizer: Organizer;
  newData: UpdateEventInputData;
}

export interface DeleteEventInput {
  eventId: string;
  organizer: Organizer;
}

export interface SearchEventInput {
  city?: string;
  venue?: string;
  venueId?: string;
  startDate?: Date;
  endDate?: Date;
  isPublic?: string;
  category?: string;
  organizerId?:string;
}

export interface SearchEventsOutput {
  count: number;
  page: number;
  next?: number | null;
  prev?: number | null;
  totalPages?: number;
  data: Event[];
}

export interface RsvpInputData {
  user: User;
  eventId: string;
}

export interface GetGuestOutput {
  id: string;
  userId: string;
  attended: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

// Organizer object without `id` and `password` fields and profile
export type EncapOrganizerWithProfile = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: Date;
  lastLogin: Date | null;
  profile: Profile;
  profileId: string | null;
  role: ROLE;
} & Profile;
