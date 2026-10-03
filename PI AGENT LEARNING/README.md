# 🧠 PI Agent Harness — Learning & Research Hub

> **Mission:** Master the art and science of building commercial-grade AI agent harnesses, then build specialized ones for coding, media, research, and personal workflows.

---

## 📖 Navigation Index

### Existing Research
- [Research 1 — Architecture Deep-Dive](Research1.md) — Five-subsystem model, memory systems, Gauntlet Loop
- [Research 2 — Comparative Teardown](Research2.md) — 7-harness capability matrix with code citations
- [Master Questions](questions.md) — 300+ research questions across 20 phases
- [Implementation Plan](implementation_plan.md) — Full research execution roadmap

### Learning Modules (in order)

| # | Module | Status | Description |
|---|--------|--------|-------------|
| 00 | [Foundations](00-foundations/) | 🟡 | What IS a harness? Core definitions & principles |
| 01 | [Teardowns](01-teardowns/) | ⬜ | Source-level analysis of Pi, Claude, Hermes, etc. |
| 02 | [Agent Runtime](02-agent-runtime/) | ⬜ | The core loop, state machine, events |
| 03 | [Context Engineering](03-context-engineering/) | ⬜ | Prompts, caching, assembly, compaction |
| 04 | [Tools System](04-tools-system/) | ⬜ | Tool contracts, MCP, routing |
| 05 | [Security](05-security/) | ⬜ | Permissions, sandboxing, threat model |
| 06 | [Memory Systems](06-memory-systems/) | ⬜ | Mnemosyne, Hindsight, pluggable memory |
| 07 | [Sessions](07-sessions/) | ⬜ | Tree-structured sessions, branching |
| 08 | [Subagents](08-subagents/) | ⬜ | Orchestration, Gauntlet Loop, A2A |
| 09 | [Extensions SDK](09-extensions-sdk/) | ⬜ | Skills, plugins, hooks, marketplace |
| 10 | [Providers](10-providers/) | ⬜ | Model abstraction, routing, local inference |
| 11 | [Observability](11-observability/) | ⬜ | Telemetry, tracing, flight recorder |
| 12 | [UI](12-ui/) | ⬜ | TUI, GUI, dashboards, steering |
| 13 | [Configuration](13-config/) | ⬜ | Hierarchy, hot-reload, agent-proposed diffs |
| 14 | [Open Source Tools](14-open-source-tools/) | ⬜ | Browser, scraping, knowledge, licensing |
| 15 | [Evaluation](15-evaluation/) | ⬜ | Benchmark suite, metrics |
| 16 | [Product Blueprints](16-product-blueprints/) | ⬜ | Coding, media, research, personal harnesses |
| 17 | [Reference Specs](17-reference-specs/) | ⬜ | Final architecture specifications |

### Working Documents
- [Notes / Insights](notes/insights.md) — Key learnings & "aha" moments
- [Notes / Gotchas](notes/gotchas.md) — Pitfalls & things to avoid
- [Notes / Open Questions](notes/open-questions.md) — Questions arising during research
- [Notes / Bookmarks](notes/bookmarks.md) — Useful repos, links, videos

### Experiments
- [scratch/mini-loop](scratch/mini-loop/) — Minimal agent loop prototype
- [scratch/tool-contract](scratch/tool-contract/) — Tool schema experiments
- [scratch/tui-prototype](scratch/tui-prototype/) — TUI layout experiments

---

## 🎯 Design Philosophy

> **Find the smallest architecture capable of expressing everything we care about.**

```
Minimal kernel + explicit capability boundaries + lazy loading
+ strong policy enforcement + complete observability
```

## 🏗️ The Actual Harnesses (future)

Once learning is complete, implementations go to `d:\Curion\PI AGENTS\`:
- `core-kernel/` — Shared minimal runtime
- `coding-agent/` — Software development harness
- `media-agent/` — Media generation harness  
- `research-agent/` — Deep research harness
- `personal-agent/` — Personal workflow harness

---

**Status Legend:** ⬜ Not started · 🟡 In progress · ✅ Complete
