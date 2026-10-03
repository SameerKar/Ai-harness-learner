# Zenswear Harness — Architecture

## High-Level Overview
Zenswear Harness is an event-driven agent runtime tailored for automated product intake, unstructured supplier messaging ingestion, catalog organization, and multi-tier LLM inference.

```
┌────────────────────────────────────────────────────────┐
│                        UI Layer                        │
│          Terminal UI (Ink)  /  Electron Desktop        │
└───────────────────────────┬────────────────────────────┘
                            │ Typed Events
┌───────────────────────────▼────────────────────────────┐
│                    Event Router (Hub)                  │
├───────────────────────────┬────────────────────────────┤
│   Finite State Machine    │   Structured JSONL Logger  │
│      (Loop & Limits)      │     (Flight Recorder)      │
└───────────────────────────┴────────────────────────────┘
```

## Subsystems
1. **Core Runtime (`packages/core`):** Event Router, State Machine, Structured Logger, Token & Iteration guardrails.
2. **Terminal UI (`packages/tui`):** Reactive console interface rendered using Ink (React in terminal) to stream live events, status, and input.
3. **Intelligence Engine:** Model-agnostic router with fallback tiers (Local Ollama, Cloud DeepSeek V3/V4, Vision fal.ai).
4. **Memory Systems:** Mnemosyne (Episodic SQLite FTS5) + Hindsight (Cognitive Graph) + Ledger (CSV & Markdown).
5. **Ingestion Pipelines:** Chokidar file watcher, WhatsApp text parser, SKU generator, asset organizer.
