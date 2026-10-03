import { EventEmitter } from 'node:events';
import { AgentEvent, AgentEventType } from './types.js';

export type EventCallback<T = unknown> = (event: AgentEvent<T>) => void | Promise<void>;

/**
 * EventRouter is the central nervous system of the Zenswear Harness.
 * Modules communicate exclusively by emitting and listening to typed AgentEvents.
 */
export class EventRouter {
  private emitter: EventEmitter;
  private wildcardListeners: Set<EventCallback> = new Set();
  private eventCounter = 0;

  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(100);

    // Default error listener so emitting 'error' does not crash Node process if caller only uses onAny
    this.emitter.on('error', () => {});
  }

  /**
   * Generates a deterministic sequence ID for events in current process
   */
  private generateId(): string {
    this.eventCounter += 1;
    const timestamp = Date.now().toString(36);
    return `evt_${timestamp}_${this.eventCounter.toString().padStart(4, '0')}`;
  }

  /**
   * Emit a typed event to all registered listeners and wildcard observers.
   */
  public emit<T = unknown>(
    type: AgentEventType,
    source: string,
    payload: T,
    id?: string
  ): AgentEvent<T> {
    const event: AgentEvent<T> = {
      id: id || this.generateId(),
      timestamp: new Date().toISOString(),
      type,
      source,
      payload,
    };

    // Emit to specific event type listeners
    this.emitter.emit(type, event);

    // Notify wildcard listeners (such as JSONL Logger, telemetry, and TUI)
    for (const listener of this.wildcardListeners) {
      try {
        const res = listener(event);
        if (res instanceof Promise) {
          res.catch((err) => {
            console.error(`[EventRouter] Async error in wildcard listener for ${type}:`, err);
          });
        }
      } catch (err) {
        console.error(`[EventRouter] Sync error in wildcard listener for ${type}:`, err);
      }
    }

    return event;
  }

  /**
   * Listen for events of a specific type.
   */
  public on<T = unknown>(type: AgentEventType, listener: EventCallback<T>): this {
    this.emitter.on(type, listener as (event: unknown) => void);
    return this;
  }

  /**
   * Listen once for an event of a specific type.
   */
  public once<T = unknown>(type: AgentEventType, listener: EventCallback<T>): this {
    this.emitter.once(type, listener as (event: unknown) => void);
    return this;
  }

  /**
   * Remove a registered listener for a specific type.
   */
  public off<T = unknown>(type: AgentEventType, listener: EventCallback<T>): this {
    this.emitter.off(type, listener as (event: unknown) => void);
    return this;
  }

  /**
   * Register a wildcard listener that receives EVERY event.
   */
  public onAny(listener: EventCallback): () => void {
    this.wildcardListeners.add(listener);
    return () => {
      this.wildcardListeners.delete(listener);
    };
  }

  /**
   * Remove all listeners.
   */
  public removeAllListeners(): void {
    this.emitter.removeAllListeners();
    this.wildcardListeners.clear();
    this.emitter.on('error', () => {});
  }
}
