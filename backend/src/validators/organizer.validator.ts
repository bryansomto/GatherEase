import {
  Joi,
  OrganizerLoginValidationInput,
  UserConfirmationValidationInput,
  UserRegistrationValidationInput,
} from './base.validator';

const schemaValues = {
  phone: Joi.string().phoneNumber({ defaultCountry: 'KE', format: 'e164' }).required(),
  code: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
};

export function organizerRegistrationValidation(data: UserRegistrationValidationInput) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: schemaValues.email,
    phone: Joi.string().phoneNumber({ defaultCountry: 'KE', format: 'e164' }).required(),
    password: schemaValues.password,
  });

  return schema.validate(data);
}

export function organizerConfirmationValidation(data: UserConfirmationValidationInput) {
  const schema = Joi.object({
    code: schemaValues.code,
    phone: schemaValues.phone,
  });

  return schema.validate(data);
}

export function organizerLoginValidation(data: OrganizerLoginValidationInput) {
  const schema = Joi.object({
    email: schemaValues.email,
    password: schemaValues.password,
  });

  return schema.validate(data);
}

export function organizerRefreshTokenValidation(data: OrganizerLoginValidationInput) {
  const schema = Joi.object({
    ownerId: Joi.string().required(),
    refreshToken: Joi.string().required(),
    role: Joi.string().required(),
  });

  return schema.validate(data);
}
