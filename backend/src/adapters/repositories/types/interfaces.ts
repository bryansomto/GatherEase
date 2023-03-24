import { Guest, Organizer, Profile, User, Venue, Event, Category, Token, Verify, Image } from '@prisma/client';
import {
  CreateEventInput,
  CreateGuestInput,
  CreateOrganizerInput,
  CreateProfileInput,
  CreateTokenInput,
  CreateUserInput,
  CreateVenueInput,
  CreateVerifyInput,
  ImageDataInput,
  OrganizerWithProfile,
  SearchEventRepoInput,
  UpdateEventInput,
  UpdateOrganizerProfileInput,
  UpdateVenueInput,
} from './types';

export interface IUserRepository {
  updateLastLogin(userId: string): Promise<User>;

  getUserById(userId: string): Promise<User | null>;

  getUserByEmail(email: string): Promise<User | null>;

  getUserByPhone(phone: string): Promise<User | null>;

  searchUsersByName(name: string): Promise<User[]>;

  createUser(userData: CreateUserInput): Promise<User>;

  createGuest(data: CreateGuestInput): Promise<Guest>;

  updateVerificationStatus(userId: string, isVerified: boolean): Promise<User>;
}

export interface IOrganizerRepository {
  updateLastLogin(organizerId: string): Promise<Organizer>;

  getOrganizerById(organizerId: string): Promise<Organizer | null>;

  getOrganizerFullProfile(organizerId: string): Promise<OrganizerWithProfile>;

  getOrganizerByEmail(email: string): Promise<Organizer | null>;

  searchOrganizersByName(name: string): Promise<Organizer[]>;

  createOrganizer(organizerData: CreateOrganizerInput): Promise<Organizer>;

  createProfile(data: CreateProfileInput): Promise<Organizer>;

  updateVerificationStatus(organizerId: string, isVerified: boolean): Promise<Profile>;

  getOrganizerByPhone(phone: string): Promise<Organizer | null>;
}

export interface IVenueRepository {
  createVenue(data: CreateVenueInput): Promise<Venue>;

  updateVenue(venueId: string, data: UpdateVenueInput): Promise<Venue>;

  deleteVenue(venueId: string): Promise<boolean>;

  getVenueById(venueId: string): Promise<Venue | null>;

  searchVenuesByName(name: string): Promise<Venue[]>;

  searchVenuesByCity(city: string): Promise<Venue[]>;
}

export interface IProfileRepositiory {
  getOrganizerProfile(organizerId: string): Promise<Profile | null>;

  updateProfileDetails(profileId: string, data: UpdateOrganizerProfileInput): Promise<Profile>;
}

export interface IEventRepository {
  createEvent(data: CreateEventInput): Promise<Event>;

  getEvent(eventId: string): Promise<Event | null>;

  deleteEvent(eventId: string): Promise<void>;

  updateEvent(eventId: string, data: UpdateEventInput): Promise<Event>;

  searchEventByCity(city: string): Promise<Event[]>;

  searchEventByVenue(venueName: string): Promise<Event[]>;

  searchEventByCategory(categoryId: string): Promise<Event[]>;

  searchEventByStatus(isPublic: boolean): Promise<Event[]>;

  searchEvents(data: SearchEventRepoInput): Promise<Event[]>;

  getCount(): Promise<number>;
}

export interface IGuestRepository {
  getGuest(guestId: string): Promise<(Guest & { user: User; event: Event }) | null>;

  deleteGuest(guestId: string): Promise<void>;

  createGuest(data: CreateGuestInput): Promise<Guest>;

  markGuestAsAttended(guestId: string): Promise<Guest>;

  retrieveGuestList(eventId: string): Promise<(Guest & { user: User })[]>;

  getGuestByEventAndUser(eventId: string, userId: string): Promise<Guest | null>;
}

export interface ICategortRepository {
  createCategory(name: string): Promise<Category>;

  deleteCategory(categoryId: string): Promise<void>;
}

export interface ITokenRepository {
  createToken(data: CreateTokenInput): Promise<Token>;

  deleteToken(id: string): Promise<void>;

  getToken(token: string): Promise<Token | null>;

  getRefreshToken(refreshToken: string): Promise<Token | null>;

  getUserTokens(ownerId: string): Promise<Token[]>;

  updateAccessToken(tokenId: string, newToken: string): Promise<Token>;

  deleteUserTokens(ownerId: string): Promise<void>;
}

export interface IVerify {
  createVerification(data: CreateVerifyInput): Promise<Verify>;

  getVerification(ownerId: string): Promise<Verify | null>;

  updateVerification(ownerId: string, code: string): Promise<Verify>;

  deleteVerfication(ownerId: string): Promise<any>;
}

export interface IImageRepo {
  createImage(data: ImageDataInput): Promise<Image>;

  deleteImage(imageId: string): Promise<void>;
}
