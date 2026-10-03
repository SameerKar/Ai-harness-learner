# What Is a Harness?

> **Related:** [Glossary](glossary.md) · [Design Principles](design-principles.md) · [Harness vs Framework vs SDK](harness-vs-framework-vs-sdk.md)

---

## Definition

An **AI agent harness** is the complete infrastructure surrounding a language model that transforms it from a stateless text predictor into a capable, safe, observable autonomous system.

A model alone is:
- **Stateless** — no memory between calls
- **Unconstrained** — no boundaries on what it tries
- **Unverified** — declares victory without proof
- **Unsandboxed** — could delete your filesystem

The harness provides everything the model cannot provide itself:

```
┌─────────────────────────────────────────────┐
│                  HARNESS                     │
│                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│   │ Context  │  │  Tools   │  │ Security │  │
│   │ Engine   │  │  System  │  │  Layer   │  │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│        │             │              │         │
│   ┌────┴─────────────┴──────────────┴─────┐  │
│   │           AGENT RUNTIME               │  │
│   │     (loop, state machine, events)     │  │
│   └────────────────┬──────────────────────┘  │
│                    │                          │
│   ┌────────────────┴──────────────────────┐  │
│   │           MODEL ADAPTER               │  │
│   │    (any LLM: Claude, GPT, DeepSeek)   │  │
│   └───────────────────────────────────────┘  │
│                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│   │ Memory   │  │ Sessions │  │   UI     │  │
│   │ System   │  │  Store   │  │ (TUI/GUI)│  │
│   └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
```

## Why It Matters

The ultimate value of an AI agent lies **not** in the model's weights, but in the **structural integrity, memory resilience, and observability** of the harness surrounding it.

### The Harness Thesis

> A harness does not make a model smarter. It creates a **closed-loop working system** that:
> 1. Prevents premature victory declarations
> 2. Orchestrates complex sub-task delegation
> 3. Guarantees every execution leaves a verifiable, clean state

*(Source: [Research1](../Research1.md), citing walkinglabs harness engineering)*

## What Makes a Good Harness?

### 1. Composable
Components can be mixed and matched. A coding harness and a media harness share the same kernel but load different tools and skills.

### 2. Model-Agnostic
Swap Claude for DeepSeek mid-session without breaking state. The model is a **replaceable component**, not a dependency.

### 3. Tool-Agnostic
Tools are declared via contracts (JSON Schema, MCP), not hardcoded. New tools plug in without modifying the core.

### 4. Product-Agnostic
The same kernel can power a coding agent, a research agent, or a personal assistant. Specialization happens at the **configuration layer**, not the kernel layer.

### 5. Observable
Every action the agent takes is visible, traceable, and auditable. No black boxes.

### 6. Secure by Default
The model should **never** be trusted to enforce its own safety. Security is a runtime concern, enforced by code, not prompts.

## The Smallest Useful Harness

Per the Pi agent philosophy, a base agent needs exactly **4 fundamental tools**:
- `read` — Read files
- `write` — Write files  
- `edit` — Edit files
- `bash` — Execute commands

Everything else is **opt-in**. This is the foundation of zero-bloat design.

## Key Insight

> **The repository itself must become the system of record.** Anything the agent cannot see in the repository practically does not exist.

---

## Next Steps
- → [Harness vs Framework vs SDK](harness-vs-framework-vs-sdk.md) — Precise taxonomy
- → [Design Principles](design-principles.md) — Architectural constitution
- → [Glossary](glossary.md) — All terms defined
