import { asClass, asFunction, InjectionMode, Lifetime, createContainer } from 'awilix';
import LoggerService from "@services/LoggerService";
import UserLoggedInEventListener from '@listeners/UserLoggedInEventListener';
import UserUpdatedEventListener from '@listeners/UserUpdatedEventListener';
import UserRepository from '@repositories/Vendor/MongoDb/UserRepository';
import UserService from "@services/UserService";
import ContentTypeHandler from "@middlewares/ContentTypeHandler";
import ErrorResponseMiddleware from "@middlewares/ErrorResponseMiddleware";
import AuthMiddleware from "@middlewares/AuthMiddleware";
import MainAPIController from "@controllers/api/MainAPIController";
import AuthenticationAPIController from "@controllers/api/AuthenticationAPIController";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});


// LISTENERS
container.register({
  UserLoggedInEventListener: asClass(UserLoggedInEventListener, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

container.register({
  UserUpdatedEventListener: asClass(UserUpdatedEventListener, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

// REPOSITORIES
container.register({
  iuserRepository: asClass(UserRepository, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});


// SERVICES
container.register({
  userService: asClass(UserService, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

container.register({
  loggerService: asClass(LoggerService, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});


// MIDDLEWARE
container.register({
  ContentTypeHandler: asClass(ContentTypeHandler, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

container.register({
  ErrorResponseMiddleware: asClass(ErrorResponseMiddleware, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

container.register({
  AuthMiddleware: asClass(AuthMiddleware, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});


// CONTROLLERS
container.register({
  mainAPIController: asClass(MainAPIController, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

container.register({
  authenticationAPIController: asClass(AuthenticationAPIController, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});

export default container;