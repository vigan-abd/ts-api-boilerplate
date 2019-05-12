import * as EmitterBase from 'events';
import EventBase from '@events/EventBase';

class EventDispatcher extends EmitterBase { }


const emitter = new EventDispatcher();

export const event = (event: EventBase) => emitter.emit(event.signature, event);
export const listen =
  (signature: string, listener: (...argv: any[]) => void) => emitter.addListener(signature, listener);