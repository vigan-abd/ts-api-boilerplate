import EventBase from '@events/EventBase';

class UserUpdatedEvent extends EventBase {
  public id: string;

  constructor(id: string) {
    super();
    this.id = id;

    this.signature = 'user-updated-event';
  }
}

export default UserUpdatedEvent;