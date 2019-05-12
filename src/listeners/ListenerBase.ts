import EventBase from "@events/EventBase";

export default abstract class ListenerBase {
  /**
   * Runs each time an event is emitted
   * @memberof ListenerBase
   */
  public abstract handle(event: EventBase): any;
}