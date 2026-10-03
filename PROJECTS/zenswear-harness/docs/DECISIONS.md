# Architectural Decision Records (ADR)

## ADR-001: Monorepo Structure with pnpm
- **Status:** Accepted
- **Context:** Decouple core engine logic (`packages/core`) from presentation (`packages/tui`, future Electron GUI).
- **Decision:** Use pnpm workspaces with strict TypeScript project configurations.

## ADR-002: Event-Driven Core Nervous System
- **Status:** Accepted
- **Context:** Multi-agent architectures need loose coupling between ingestion, inference, UI, and storage.
- **Decision:** Implement typed `EventRouter` as the central bus through which all components communicate.

## ADR-003: Safety Guardrails in Finite State Machine
- **Status:** Accepted
- **Context:** Autonomous agents risk runaway execution loops and unmetered token consumption.
- **Decision:** Enforce hard stops: maximum 5 iterations per execution cycle, repeated action fingerprint detection, and user-in-the-loop gates for mutative operations.
