export enum AuthorizationOptions {
  EMAIL_VALIDATION = '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
  NAME_LENGTH = 20,
  PASSWORD_LENGTH = 8,
}

export enum userOptions {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}
