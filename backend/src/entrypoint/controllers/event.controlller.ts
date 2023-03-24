import { Request, Response } from 'express';
import {
  deleteEventValidation,
  searchEventsValidation,
  updateEventValidation,
  validateCreateEvent,
} from '../../validators/event.validator';
import { eventService, imageService } from '../../services/event';
import { Organizer, User } from '@prisma/client';
import { ServiceError } from '../../services/exceptions';

export async function createEvent(req: Request, res: Response) {
  const { error } = validateCreateEvent(req.body);
  const organizer = req.user as Organizer;

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const newEvent = await eventService.createEvent({
      organizer: organizer,
      ...req.body,
    });

    return res.status(201).json({
      message: 'Event created successfully',
      data: {
        event: newEvent,
      },
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function uploadEventImage(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({
      message: 'image not found',
    });
  }

  try {
    const newImage = await imageService.uploadEventImage({
      organizer: req.user as Organizer,
      image: req.file as Express.Multer.File,
    });

    return res.status(200).json({
      message: 'success',
      data: {
        ...newImage,
      },
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function updateEvent(req: Request, res: Response) {
  const { eventId } = req.params;
  const { error } = updateEventValidation({ ...req.body, eventId });

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const newEvent = await eventService.updateEventDetails({
      newData: { ...req.body },
      eventId,
      organizer: req.user as Organizer,
    });

    return res.status(200).json({
      message: 'Event details updated',
      date: {
        ...newEvent,
      },
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  const { error } = deleteEventValidation({ eventId: req.params.eventId });
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const deleted = await eventService.deleteEvent({ eventId: req.params.eventId, organizer: req.user as Organizer });

    return res.status(200).json({
      message: 'deleted',
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function searchEvents(req: Request, res: Response) {
  const { error } = searchEventsValidation(req.query);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const retrievedEvents = await eventService.searchEvent(req.query);

    return res.status(200).json({
      message: 'success',
      data: retrievedEvents,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function getEvent(req: Request, res: Response) {
  const { eventId } = req.params;

  if (!eventId) return res.status(400).json({ message: '`eventId` is required' });

  try {
    const event = await eventService.getEvent(eventId);

    return res.status(200).json({
      message: 'success',
      data: event,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function rsvpToEvent(req: Request, res: Response) {
  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({
      message: '`eventId` is required',
    });
  }

  try {
    const guest = await eventService.rsvp({ eventId, user: req.user as User });

    return res.status(200).json({
      message: 'success',
      data: guest,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function getGuest(req: Request, res: Response) {
  const { guestId } = req.params;

  if (!guestId) {
    return res.status(400).json({
      message: '`guestId` is required',
    });
  }

  try {
    const guest = await eventService.getGuest(guestId, req.user as Organizer);

    return res.status(200).json({
      message: 'success',
      data: guest,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function getGuestList(req: Request, res: Response) {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      message: '`eventId` is required',
    });
  }

  try {
    const guestList = await eventService.getGuestList(eventId, req.user as Organizer);

    return res.status(200).json({
      message: 'success',
      data: guestList,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function deleteGuest(req: Request, res: Response) {
  const { guestId } = req.params;

  if (!guestId) {
    return res.status(400).json({
      message: '`guestId` is required',
    });
  }

  try {
    const deleted = await eventService.deleteGuest(guestId, req.user as Organizer);

    return res.status(200).json({
      message: 'Success',
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function markGuestAsAttended(req: Request, res: Response) {
  const { guestId } = req.body;

  if (!guestId) {
    return res.status(400).json({
      message: '`guestId` is required',
    });
  }

  try {
    const guest = await eventService.markGuestAtAttended(guestId, req.user as Organizer);

    return res.status(200).json({
      message: 'success',
      data: guest,
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
