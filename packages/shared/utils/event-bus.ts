type EventHandler = (...args: any[]) => void;

class EventBus {
  private events: Record<string, Set<EventHandler>> = {}; // Set 会自动去重

  on(event: string, handler: EventHandler) {
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    this.events[event].add(handler);
  }

  off(event: string, handler: EventHandler) {
    this.events[event]?.delete(handler);
  }

  emit(event: string, ...args: any[]) {
    this.events[event]?.forEach(handler => handler(...args));
  }
}

const eventBus = new EventBus();
export default eventBus;
