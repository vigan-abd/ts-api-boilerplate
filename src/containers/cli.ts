import { asClass, asFunction, InjectionMode, Lifetime, createContainer } from 'awilix';
import LoggerService from "@services/LoggerService";
import PrintArgs from "@console/commands/PrintArgs";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

// Services
container.register({
  loggerService: asClass(LoggerService, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});


// Commands
container.register({
  printArgs: asClass(PrintArgs, {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC
  })
});


export default container;