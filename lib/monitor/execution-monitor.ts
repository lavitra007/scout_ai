import { ExecutionEvent } from "@/types/execution";

export type EventSubscriber = (events: ExecutionEvent[]) => void;

class ExecutionMonitor {
  private events: ExecutionEvent[] = [];
  private subscribers: Set<EventSubscriber> = new Set();

  /**
   * Emit a new event into the monitor and notify all subscribers.
   */
  public emit(event: ExecutionEvent) {
    this.events.push(event);
    this.notifySubscribers();
  }

  /**
   * Retrieve the full log of events for the current session.
   */
  public getExecutionEvents(): ExecutionEvent[] {
    return [...this.events];
  }

  /**
   * Subscribe to live event updates. Returns an unsubscribe function.
   */
  public subscribe(callback: EventSubscriber): () => void {
    this.subscribers.add(callback);
    // Send immediate initial state
    callback([...this.events]);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Clear the event log.
   */
  public clear() {
    this.events = [];
    this.notifySubscribers();
  }

  private notifySubscribers() {
    const currentEvents = [...this.events];
    this.subscribers.forEach(sub => sub(currentEvents));
  }
}

// Global Singleton
export const executionMonitor = new ExecutionMonitor();
