# Harness vs Framework vs SDK vs Runtime vs Application

> Precise taxonomy — these terms are often confused but mean very different things.

---

## The Spectrum

```
              Less opinionated                    More opinionated
              ←───────────────────────────────────────────────────→

    SDK          Runtime        Framework        Harness        Application
    │              │               │               │               │
  Library      Engine that     Provides         Complete        Ready-to-use
  of tools     runs agent      structure +      system with     product
  you call     loops           conventions      policies,       (e.g., Claude
  from your                    for building     safety,         Code desktop
  own code                     agents           memory, UI      app)
```

## Definitions

### SDK (Software Development Kit)
**What it is:** A library of functions and types you import into your own code.

**Example:** `@earendil-works/pi-agent-core` — you call its API, you control the loop.

**You own:** Everything. The SDK is a dependency.

```typescript
import { Agent } from '@pi/agent-core';
const agent = new Agent({ model: 'claude-4' });
await agent.run(userInput);
```

### Runtime
**What it is:** An engine that manages the agent loop lifecycle. You configure it; it runs the loop.

**Example:** Pi's agent loop engine, Hermes's `AIAgent` class.

**You own:** Configuration, tools, prompts. The runtime owns the loop.

### Framework
**What it is:** Provides structure, conventions, and patterns. You build within its constraints.

**Example:** LangChain, CrewAI — they dictate how you compose agents and chains.

**You own:** Business logic. The framework owns architecture.

### Harness
**What it is:** A complete, opinionated system that wraps a model with everything needed for autonomous operation — tools, memory, permissions, UI, observability.

**Example:** The thing we're building. Pi coding agent. Hermes agent.

**You own:** Specialization via configuration and extensions. The harness owns safety, memory, context.

### Application
**What it is:** A finished product users interact with directly.

**Example:** Claude Code desktop app, GitHub Copilot, Cursor.

**You own:** Nothing internal. You're a user.

## Key Differences Matrix

| Aspect | SDK | Runtime | Framework | Harness | Application |
|--------|-----|---------|-----------|---------|-------------|
| **Who controls the loop?** | You | Runtime | Framework | Harness | App |
| **Who defines tools?** | You | You | Framework patterns | Harness + plugins | App |
| **Who handles safety?** | You | You | Partial | Harness (mandatory) | App |
| **Who manages memory?** | You | You | Framework patterns | Harness + providers | App |
| **Who owns the UI?** | You | You | You | Harness (TUI/GUI) | App |
| **Extensible?** | N/A | Via code | Via patterns | Via plugins/skills/MCP | Limited |
| **Sellable as product?** | No (library) | No (engine) | No (pattern) | **Yes** | Already a product |

## Why We're Building a Harness

We want something that is:
1. **More than an SDK** — includes safety, memory, UI out of the box
2. **More than a framework** — has opinions about security, not just structure
3. **Less than an application** — configurable for different domains (coding, media, etc.)
4. **Sellable** — each specialized harness is a distinct product

The harness is the **sweet spot** for commercial specialization.

---

## Where Existing Projects Sit

| Project | Category | Why |
|---------|----------|-----|
| Pi (earendil) | **Harness** | Full runtime + TUI + sessions + extensions + compaction |
| Claude Code | **Application** | Complete product, proprietary, not extensible at core |
| Codex CLI | **Runtime** | Minimal loop, no memory, no plugins, no UI framework |
| Hermes | **Harness** | Runtime + memory + plugins + TUI + desktop + A2A |
| OpenCode | **Runtime → Harness** | Evolving from minimal to full-featured |
| Goose | **Harness** | Runtime + MCP ecosystem + permissions + GUI |
| Cline | **Harness** | Runtime + IDE integration + Kanban + SDK |
| LangChain | **Framework** | Provides patterns, not policies |
| CrewAI | **Framework** | Multi-agent patterns, not a complete system |

---

## References
- [What Is a Harness](what-is-a-harness.md)
- [Design Principles](design-principles.md)
