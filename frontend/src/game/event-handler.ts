export type Listener = (...args: any[]) => void;

class EventHandler {
  private events: Map<string, Listener[]>;

  constructor() {
    this.events = new Map();
  }

  public on(name: string, listener: Listener) {
    if (!this.events.has(name)) {
      this.events.set(name, []);
    }

    this.events.get(name)?.push(listener);
  }

  public do(name: string, ...args: any[]) {
    if (!this.events.has(name)) return;

    for (const listener of this.events.get(name)!) {
      listener(...args);
    }
  }

  public rm(name: string) {
    this.events.delete(name);
  }

  public clear() {
    this.events.clear();
  }
}

export default new EventHandler();
