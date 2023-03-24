export class ServiceError extends Error {}

export class UserExistsError extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class UserNotFound extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class VerificationNotFound extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class InvalidCode extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class UserAlreadyVerified extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class InvalidCredentials extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class InvalidToken extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class ImageUploadError extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class EventNotFound extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class GuestNotFound extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class UserAlreadyRsvp extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class UnauthorizedAction extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class Forbidden extends ServiceError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
