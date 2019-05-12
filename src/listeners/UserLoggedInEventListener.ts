import ListenerBase from '@listeners/ListenerBase';
import UserLoggedInEvent from '@events/UserLoggedInEvent';
import UserService from '@services/UserService';
import LoggerService from '@services/LoggerService';
import config from '@config';

const { APP_ENV } = config;

class UserLoggedInEventListener extends ListenerBase {
  protected userService: UserService;
  protected loggerService: LoggerService;

  constructor(userService: UserService, loggerService: LoggerService) {
    super();
    this.userService = userService;
    this.loggerService = loggerService;

    this.handle = this.handle.bind(this);
  }

  async handle(event: UserLoggedInEvent) {
    if (APP_ENV == 'test') return;

    try {
      const now = new Date();
      await this.userService.updateStamps(event.id, {
        updated: now, lastLogin: now
      });
    } catch (ex) {
      this.loggerService.log('error', ex, { tags: 'network,remote' });
    }
  }
}

export default UserLoggedInEventListener;