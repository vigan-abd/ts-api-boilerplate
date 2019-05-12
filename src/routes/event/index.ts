import { AwilixContainer } from 'awilix';
import { listen } from '@helpers/EventHelper';
import UserLoggedInEvent from '@events/UserLoggedInEvent';
import UserUpdatedEvent from '@events/UserUpdatedEvent';
import UserLoggedInEventListener from '@listeners/UserLoggedInEventListener';
import UserUpdatedEventListener from '@listeners/UserUpdatedEventListener';

const register = (container: AwilixContainer) => {
  // SIGNATURES
  const USER_LOGGED_IN_EVENT = new UserLoggedInEvent("").signature;
  const USER_UPDATED_EVENT = new UserUpdatedEvent("").signature;

  // LISTENERS
  const UserLoggedInEventListener: UserLoggedInEventListener = container.resolve('UserLoggedInEventListener');
  const UserUpdatedEventListener: UserUpdatedEventListener = container.resolve('UserUpdatedEventListener');  

  // HOOKS
  listen(USER_LOGGED_IN_EVENT, UserLoggedInEventListener.handle);
  listen(USER_UPDATED_EVENT, UserUpdatedEventListener.handle);
}

export default register;