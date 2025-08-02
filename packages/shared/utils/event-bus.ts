type EventHandler = (...args: any[]) => any | Promise<any>;

class EventBus {
  private events: Record<string, Set<EventHandler>> = {};

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

  async emitAsync<T = any>(event: string, ...args: any[]): Promise<T[]> {
    const handlers = this.events[event];
    if (!handlers || handlers.size === 0) return [];
    const promises = [...handlers].map(fn => fn(...args));
    return Promise.all(promises);
  }
}

const eventBus = new EventBus();
export default eventBus;
