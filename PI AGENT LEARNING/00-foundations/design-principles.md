# Design Principles — Architectural Constitution

> These principles govern every architectural decision. No feature gets added unless it satisfies these constraints.

---

## The 10 Commandments of Harness Design

### 1. Minimal Kernel, Maximum Reach
The core runtime must be as small as possible. Everything beyond the agent loop, model adapter, tool router, and event bus is **optional**.

> "What is the smallest possible useful harness?" — [Questions Q4](../questions.md)

### 2. Earn Your Place
Every component must pass the [decision tree](../questions.md#the-architecture-decision-tree):
```
Does it belong in core?
    YES → Core primitive
    NO  → Is it reusable?
        YES → Plugin or Skill
            Needs API? → MCP Server
            No API?    → Skill
        NO  → Product-specific code
```

### 3. Never Trust the Model for Safety
Security is a **runtime concern**, enforced by code. The model is **never allowed** to:
- Decide its own permission boundaries
- Modify its own security policies
- Override sandbox restrictions via prompt

> "What should the model never be allowed to decide?" — [Questions Q11](../questions.md)

### 4. Progressive Disclosure, Not Progressive Bloat
Skills, tools, and context are loaded **on-demand**, not at startup. The system prompt starts small and grows only as needed.

> Hermes describes skills as "on-demand knowledge documents designed specifically to minimize token usage rather than injecting everything all the time." — [Questions Phase 4](../questions.md)

### 5. Observe Everything
Every action must emit a traceable event. If you can't see it, you can't debug it, audit it, or bill for it.

```
Agent Runtime → Event Bus → {TUI, Telemetry, Plugins, Replay}
```

### 6. Separate Policy, Approval, and Execution
Three distinct layers, never collapsed:
```
Policy Engine     → "Is this allowed by rules?"
Approval Engine   → "Does the user approve?"  
Execution Sandbox → "Run it safely"
```

### 7. Model-Agnostic by Architecture
The model adapter is a **replaceable module**. Swapping providers must not require changes to:
- Tool definitions
- Session state
- Memory
- UI
- Extensions

### 8. Configuration is Hierarchical, Never Flat
```
Global → User → Product → Project → Workspace → Session → Agent → Task
```
Each layer can override the one above. The agent can **propose** config changes but never **apply** them without approval.

### 9. Sessions Are Trees, Not Lists
Conversations are directed acyclic graphs with branching, forking, and cloning. Linear chat history is a solved (and inferior) problem.

### 10. The Repository Is the Source of Truth
Agent instructions live **in the repo** (`AGENTS.md`, `.pi/SYSTEM.md`), not in some external config. If it's not in the repo, the agent shouldn't know about it.

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | What To Do Instead |
|-------------|--------------|-------------------|
| Monolithic system prompt | Context bloat, prompt drift | Layered, progressive disclosure |
| Model self-evaluates quality | Always declares premature victory | Gauntlet Loop with blind critic |
| Hardcoded tools | Can't specialize for different products | Tool contracts + registry |
| Single flat config file | Can't distinguish global vs project | Hierarchical config resolution |
| Trust-by-prompt security | LLM bypasses restrictions trivially | Runtime permission gates + sandbox |
| Everything always loaded | Token waste, model confusion | Lazy loading, skill retrieval |
| Linear session history | Can't recover from failed branches | Tree-structured sessions |
| Vendor-locked model calls | Dead when provider changes API | Provider abstraction layer |

---

## References
- [Research 1 — Five-Subsystem Model](../Research1.md)
- [Questions — Architectural Decision Tree](../questions.md)
- [Glossary](glossary.md)
