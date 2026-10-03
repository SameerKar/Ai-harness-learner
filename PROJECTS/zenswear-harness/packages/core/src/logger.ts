import * as fs from 'node:fs';
import * as path from 'node:path';
import * as readline from 'node:readline';
import { AgentEvent } from './types.js';
import { EventRouter } from './event-router.js';

export interface LoggerOptions {
  logDir?: string;
  sessionName?: string;
  autoAttach?: boolean;
}

/**
 * StructuredJsonlLogger is the flight recorder of the agent harness.
 * Every event emitted across the harness is serialized as a single-line JSON entry.
 */
export class StructuredJsonlLogger {
  private logDir: string;
  private currentLogFilePath: string;
  private writeStream: fs.WriteStream | null = null;
  private unsubscribeRouter: (() => void) | null = null;

  constructor(router?: EventRouter, options: LoggerOptions = {}) {
    this.logDir = options.logDir || path.resolve(process.cwd(), 'data', 'logs');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    const sessionStamp = options.sessionName || this.createSessionTimestamp();
    const logFileName = `session_${sessionStamp}.jsonl`;
    this.currentLogFilePath = path.join(this.logDir, logFileName);

    this.writeStream = fs.createWriteStream(this.currentLogFilePath, {
      flags: 'a',
      encoding: 'utf8',
    });

    if (router && options.autoAttach !== false) {
      this.attachToRouter(router);
    }
  }

  private createSessionTimestamp(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}`;
  }

  public getLogPath(): string {
    return this.currentLogFilePath;
  }

  public attachToRouter(router: EventRouter): void {
    if (this.unsubscribeRouter) {
      this.unsubscribeRouter();
    }
    this.unsubscribeRouter = router.onAny((event: AgentEvent) => {
      this.logEvent(event);
    });
  }

  public logEvent(event: AgentEvent): void {
    if (!this.writeStream || this.writeStream.destroyed) {
      return;
    }
    const line = JSON.stringify(event) + '\n';
    this.writeStream.write(line);
  }

  /**
   * Reads the last N events from the current session's log file.
   */
  public async readLastN(n = 10): Promise<AgentEvent[]> {
    if (!fs.existsSync(this.currentLogFilePath)) {
      return [];
    }

    const events: AgentEvent[] = [];
    const fileStream = fs.createReadStream(this.currentLogFilePath, { encoding: 'utf8' });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const parsed = JSON.parse(trimmed) as AgentEvent;
        events.push(parsed);
      } catch {
        // Skip malformed lines if any
      }
    }

    if (n <= 0) return events;
    return events.slice(-n);
  }

  /**
   * Flush and close stream cleanly
   */
  public async close(): Promise<void> {
    if (this.unsubscribeRouter) {
      this.unsubscribeRouter();
      this.unsubscribeRouter = null;
    }

    return new Promise((resolve) => {
      if (!this.writeStream || this.writeStream.destroyed) {
        resolve();
        return;
      }
      this.writeStream.end(() => {
        resolve();
      });
    });
  }
}
