import EventBase from '@events/EventBase';

class UserLoggedInEvent extends EventBase {
  public id: string;

  constructor(id: string) {
    super();
    this.id = id;

    this.signature = 'user-logged-in-event';
  }
}

export default UserLoggedInEvent;