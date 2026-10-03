# Event-Driven Agent Nervous System

> **Module:** `02-agent-runtime`  
> **Source Implementation:** `PROJECTS/zenswear-harness/packages/core/src/event-router.ts` & `logger.ts`  
> **Status:** ✅ Enriched from Stages S03–S04 implementation

---

## 1. Architectural Role of the Event Router

Rather than tight coupling where subagents directly call UI or logger methods, the agent harness uses a publish-subscribe event bus (`EventRouter`).

```
                ┌──────────────┐
                │ Event Router │
                └──────┬───────┘
                       │
       ┌───────────────┼───────────────┬────────────────┐
       ▼               ▼               ▼                ▼
┌──────────────┐┌──────────────┐┌───────────────┐┌──────────────┐
│ State Machine││ JSONL Logger ││ Terminal / GUI││  Telemetry   │
└──────────────┘└──────────────┘└───────────────┘└──────────────┘
```

## 2. Event Contract Specification

Every event in the system implements the canonical `AgentEvent<T>` interface:

```typescript
export interface AgentEvent<T = unknown> {
  id: string;          // Format: evt_<base36_timestamp>_<counter>
  timestamp: string;   // ISO 8601 UTC string
  type: AgentEventType;// Standard lifecycle or subsystem event
  source: string;      // Component name (e.g. 'core', 'm1-ingestion', 'tui')
  payload: T;          // Strongly typed data payload
}
```

## 3. The Flight Recorder Pattern (JSONL Logging)

- **Zero overhead during runtime:** Append-only streaming to `data/logs/session_<timestamp>.jsonl`.
- **Replayability:** Each event is a single serialized line, allowing crash reconstruction and deterministic trajectory replay.
- **Auditing:** Enables compliance, cost analysis, and offline prompt evaluations.
