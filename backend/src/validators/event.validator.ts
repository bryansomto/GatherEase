import { SearchEventInput } from '../services/types/types';
import {
  CreateEventInputValidation,
  DeleteEventValidationInput,
  Joi,
  UpdateEventValidationInput,
} from './base.validator';

const schemaValues = {
  eventId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  venueId: Joi.string().required(),
  categoryId: Joi.string().required(),
  isPublic: Joi.boolean().required(),
  day: Joi.string().required(),
  date: Joi.date().required(),
  city: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
};

export function validateCreateEvent(data: CreateEventInputValidation) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    venueId: Joi.string().required(),
    categoryId: Joi.string().required(),
    isPublic: Joi.boolean().required(),
    day: Joi.string().required(),
    date: Joi.date().required(),
    city: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
  });

  return schema.validate(data);
}

export function updateEventValidation(data: UpdateEventValidationInput) {
  const schema = Joi.object({
    eventId: schemaValues.eventId,
    title: Joi.string(),
    description: Joi.string(),
    venueId: Joi.string(),
    categoryId: Joi.string(),
    isPublic: Joi.boolean(),
    day: Joi.string(),
    date: Joi.date(),
    city: Joi.string(),
    imageUrl: Joi.string().uri(),
  });

  return schema.validate(data);
}

export function deleteEventValidation(data: DeleteEventValidationInput) {
  const schema = Joi.object({
    eventId: schemaValues.eventId,
  });

  return schema.validate(data);
}

export function searchEventsValidation(data: SearchEventInput) {
  const schema = Joi.object({
    city: Joi.string(),
    venue: Joi.string(),
    venueId: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.string(),
    isPublic: Joi.bool(),
    category: Joi.string(),
    organizerId: Joi.string(),
  });

  return schema.validate(data);
}
