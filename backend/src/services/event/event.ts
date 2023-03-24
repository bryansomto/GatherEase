import { IEventRepository, IGuestRepository, IOrganizerRepository } from '../../adapters/repositories/types/interfaces';
import { Event, Guest, Organizer, User } from '.prisma/client';
import {
  CreateEventInput,
  DeleteEventInput,
  GetGuestOutput,
  RsvpInputData,
  SearchEventInput,
  SearchEventsOutput,
  UpdateEventInput,
} from '../types/types';
import { EventNotFound, Forbidden, GuestNotFound, UnauthorizedAction, UserAlreadyRsvp } from '../exceptions';
import { ICodeGenerator } from '../../utils/types/interfaces';

export default class EventService {
  public static inject = ['eventRepo', 'guestRepo', 'codeGenerator'] as const;

  constructor(
    private readonly eventRepo: IEventRepository,
    private readonly guestRepo: IGuestRepository,
    private readonly codeGenerator: ICodeGenerator
  ) {}

  async createEvent(data: CreateEventInput): Promise<Event> {
    // create entry in DB
    if (data.imageUrl) {
      const newEvent = await this.eventRepo.createEvent({
        title: data.title,
        description: data.description,
        venueId: data.venueId,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        isPublic: data.isPublic,
        day: data.day,
        date: data.date,
        city: data.city,
        organizerId: data.organizer.id,
      });

      return newEvent;
    }
    const newEvent = await this.eventRepo.createEvent({
      title: data.title,
      description: data.description,
      venueId: data.venueId,
      categoryId: data.categoryId,
      isPublic: data.isPublic,
      day: data.day,
      date: data.date,
      city: data.city,
      organizerId: data.organizer.id,
    });

    return newEvent;
  }

  async getEvent(eventId: string): Promise<Event> {
    const event = await this.eventRepo.getEvent(eventId);

    if (!event) throw new EventNotFound('Event not found');

    return event;
  }

  async updateEventDetails(data: UpdateEventInput): Promise<Event> {
    const currentEvent = await this.getEvent(data.eventId);

    if (currentEvent.organizerId !== data.organizer.id) {
      throw new UnauthorizedAction('Cannot update an event you did not create');
    }

    const newEvent = await this.eventRepo.updateEvent(data.eventId, { ...data.newData });

    return newEvent;
  }

  async deleteEvent(data: DeleteEventInput): Promise<boolean> {
    const event = await this.getEvent(data.eventId);

    if (event.organizerId !== data.organizer.id) {
      throw new UnauthorizedAction('Cannot delete an event you did not create');
    }

    await this.eventRepo.deleteEvent(data.eventId);

    return true;
  }

  async searchEvent(searchData: SearchEventInput, limit = 10, page = 1): Promise<SearchEventsOutput> {
    const startingIndex = (page - 1) * limit;
    const events = await this.eventRepo.searchEvents({
      limit,
      page: startingIndex,
      filters: {
        ...searchData,
      },
    });

    const totalRows = await this.eventRepo.getCount();
    const totalPages = Math.ceil(totalRows / limit);
    const next = totalRows > startingIndex - 1 + limit ? page + 1 : null;
    const prev = startingIndex > 0 ? page - 1 : null;

    return {
      count: events.length,
      page,
      next,
      prev,
      totalPages,
      data: events,
    };
  }

  async rsvp(data: RsvpInputData): Promise<Guest> {
    const existingEvent = await this.getEvent(data.eventId);

    const existingGuest = await this.guestRepo.getGuestByEventAndUser(data.eventId, data.user.id);

    if (existingGuest) throw new UserAlreadyRsvp('You have already RSVP to this event');

    // create guest
    const newGuest = await this.guestRepo.createGuest({ userId: data.user.id, eventId: data.eventId });

    return newGuest;
  }

  async getGuest(guestId: string, organizer: Organizer): Promise<any> {
    const retrievedGuest = await this.guestRepo.getGuest(guestId);

    if (!retrievedGuest) throw new GuestNotFound('Guest not found');

    if (retrievedGuest.event.organizerId !== organizer.id) {
      throw new Forbidden('Forbidden');
    }

    return {
      id: retrievedGuest.id,
      userId: retrievedGuest.userId,
      attended: retrievedGuest.attended,
      user: this.codeGenerator.filterObject(retrievedGuest.user, {
        include: ['firstName', 'lastName', 'email', 'phone'],
      }),
    };
  }

  async deleteGuest(guestId: string, organizer: Organizer): Promise<true> {
    const guest = await this.getGuest(guestId, organizer);

    await this.guestRepo.deleteGuest(guestId);

    return true;
  }

  async getGuestList(
    eventId: string,
    organizer: Organizer
  ): Promise<{ count: number; guests: { [key: string]: any }[] }> {
    const event = await this.getEvent(eventId);
    if (event.organizerId !== organizer.id) throw new Forbidden('Forbidden resource');

    const guests = await this.guestRepo.retrieveGuestList(eventId);

    const filteredGuests = guests.map((guest) => {
      let user = this.codeGenerator.filterObject(guest.user, {
        include: ['firstName', 'lastName', 'email', 'phone'],
      });

      return {
        ...guest,
        user,
      };
    });

    return {
      count: filteredGuests.length,
      guests: filteredGuests,
    };
  }

  async markGuestAtAttended(guestId: string, organizer: Organizer): Promise<Guest> {
    const guest = await this.getGuest(guestId, organizer);

    return this.guestRepo.markGuestAsAttended(guestId);
  }
}
