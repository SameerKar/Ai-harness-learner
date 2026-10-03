# Insights — Key Learnings & "Aha" Moments

> Running log of the most important realizations during research. Add entries as you learn.

---

## From Existing Research

### 2026-08-19 — Initial Research Synthesis

1. **The model is never the product.** The harness is. Models are commoditized; harnesses are differentiators. *(Research1)*

2. **4 tools is enough for a base agent.** Read, write, edit, bash. Everything else is opt-in. Pi proves this works. *(Research1)*

3. **Never collapse Policy → Approval → Sandbox into one layer.** Each serves a different purpose and fails differently. *(Questions Phase 7)*

4. **Skills are not instructions — they are on-demand knowledge.** The distinction matters for token economy. Hermes gets this right. *(Questions Phase 4)*

5. **Session trees, not session lists.** Branching enables recovery from failed experiments without starting over. Pi, Hermes both do this. *(Research2)*

6. **Subagents should NOT inherit full parent capabilities.** Cline's read-only research subagent is the model to follow. Least privilege for delegation. *(Questions Phase 10)*

7. **Compaction is not just "summarize old messages."** It must preserve: terminal filesystem state, current goal, proven negative constraints (what NOT to try again), git state. *(Research1 — Threadshift)*

8. **Firecrawl is AGPL-3.0.** Cannot use the server in a commercial SaaS product without releasing source. Must use only the MIT-licensed SDK, or use Crawl4AI instead. *(Questions Phase 18)*

9. **Memory providers must be pluggable.** Hermes's architecture (built-in + one external at a time) is the right pattern. Never hardcode a specific memory backend. *(Research2)*

10. **Events are the universal interface.** TUI, telemetry, plugins, replay — all consume the same event stream. Design the event schema first. *(Questions Phase 3)*

11. **Tools should self-register.** Do not hardcode a giant array of tools. Hermes uses a `@registry.register` decorator at import time, making tools fully decoupled and pluggable. *(Hermes Teardown)*

---

## Template for New Entries

```
### YYYY-MM-DD — [Source/Context]
**Insight:** [What you learned]
**Why it matters:** [Connection to harness design]
**Reference:** [Link to source]
```

### 2026-08-23 � [S01: Project Scaffold]
**Insight:** Starting as a pnpm monorepo from Day 1 is better than migrating later.
**Why it matters:** It isolates the UI code (Ink) from the core harness engine, preventing imports from tangling and setting up a clean boundary for when the Electron dashboard is added in Phase 5.
**Reference:** Zenswear S01 Implementation Plan
