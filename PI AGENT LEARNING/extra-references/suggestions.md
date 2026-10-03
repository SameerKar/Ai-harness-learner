# Suggestions & Next Steps

> Full status audit, gap analysis, dashboard improvement roadmap, and research execution plan for the PI Agent Learning repository.  
> Last updated: 2026-08-20

---

## 1. Content Coverage Audit

### 1.1 Enriched Files (ready to read)

These files have been fully written and contain substantive, research-backed content:

| File | Size | Status | Notes |
|------|------|--------|-------|
| `00-foundations/what-is-a-harness.md` | 4.9 KB | ✅ Written | Defines the core concept, differentiates from raw LLM wrappers |
| `00-foundations/harness-vs-framework-vs-sdk.md` | 4.5 KB | ✅ Written | Comparison table and decision matrix |
| `00-foundations/design-principles.md` | 3.9 KB | ✅ Written | 10 guiding principles (minimal kernel, progressive disclosure, etc.) |
| `00-foundations/glossary.md` | 6.8 KB | ✅ Written | 40+ terms across 7 categories (core, architecture, memory, security, etc.) |
| `01-teardowns/hermes-agent.md` | 10.9 KB | ✅ Researched | Full source-level teardown with Q16-Q43 answered. Covers tool registry, A2A, security model, memory providers |
| `Research1.md` | 35.2 KB | ✅ Reference | Five-subsystem model, Mnemosyne, Hindsight, Gauntlet Loop theory |
| `Research2.md` | 58.4 KB | ✅ Reference | 7-project comparative teardown, capability matrix, minimal kernel spec, implementation roadmap |
| `questions.md` | 43.1 KB | ✅ Reference | Master research program — 20 phases, ~300+ questions |
| `implementation_plan.md` | 34.5 KB | ✅ Reference | Master roadmap, directory map, research methodology, example prompts |
| `SKILL.md` | 6.9 KB | ✅ Operational | Research agent instruction set for enriching stub files |

### 1.2 Living Notes (actively maintained)

| File | Size | Purpose |
|------|------|---------|
| `notes/insights.md` | 2.3 KB | 11 key "aha" moments captured so far |
| `notes/gotchas.md` | 1.7 KB | Pitfalls and things that went wrong |
| `notes/bookmarks.md` | 3.4 KB | Curated links to repos, articles, videos |
| `notes/open-questions.md` | 0.9 KB | Unresolved questions for future research |

### 1.3 Stub Files (need research — exist but are mostly empty)

These files have been created with title, status, priority, and question numbers, but have not been enriched yet:

| File | Size | Priority | Questions | Depends On |
|------|------|----------|-----------|------------|
| `01-teardowns/pi-agent.md` | 482 B | P0 | Q16-Q43 | Pi repo + Research2 |
| `01-teardowns/claude-code.md` | 360 B | P0 | Q16-Q43 | Claude docs + Research2 |
| `01-teardowns/comparison-matrix.md` | 276 B | P0 | Synthesis | All teardowns |
| `02-agent-runtime/agent-loop-design.md` | 341 B | P0 | Q44-Q70 | Teardowns complete |
| `03-context-engineering/prompt-architecture.md` | 336 B | P0 | Q71-Q95 | Agent runtime |
| `04-tools-system/tool-contract-spec.md` | 289 B | P0 | Q96-Q125 | Agent runtime |
| `05-security/permission-model.md` | 305 B | P0 | Q126-Q155 | Tool system |
| `06-memory-systems/memory-classes.md` | 294 B | P1 | Q206-Q223 | Research1 (Mnemosyne/Hindsight) |
| `08-subagents/gauntlet-loop.md` | 341 B | P1 | Q156-Q175 | Agent runtime + security |
| `12-ui/tui-architecture.md` | 323 B | P1 | Q176-Q195 | Observability |
| `14-open-source-tools/licensing-matrix.md` | 548 B | P1 | Q224-Q245 | All teardowns |

### 1.4 Missing Files (directories exist but contain no `.md` files)

These directories were created as part of the repository skeleton but have zero content inside them. Stub files need to be created before research can begin:

| Directory | Expected Stub Files | Priority | Question Range |
|-----------|-------------------|----------|----------------|
| `07-sessions/` | `session-tree-model.md` — How sessions are stored as DAGs/trees, branching/forking mechanics, JSONL vs SQLite tradeoffs | P1 | Q176-Q195 |
| `09-extensions-sdk/` | `extension-api-design.md` — TypeScript/JS extension API patterns, lifecycle hooks (`pre_prompt`, `post_tool_call`), manifest formats | P1 | Q196-Q205 |
| `10-providers/` | `provider-abstraction-layer.md` — Unified multi-provider API design, model routing, credential management, fallback chains | P1 | Q224-Q245 |
| `11-observability/` | `event-bus-design.md` — Pub/sub event schemas, telemetry pipelines, cost tracking, context thermometers | P1 | Q176-Q195 |
| `13-config/` | `config-discovery.md` — Layered config hierarchy (global → user → project), hot-reload, environment variable precedence | P2 | Q246-Q265 |
| `15-evaluation/` | `testing-strategies.md` — E2E vs unit testing for agents, Gauntlet Loop benchmarks, adversarial critic design | P2 | Q266-Q280 |
| `16-product-blueprints/` | `coding-harness-blueprint.md` — LSP integration, debugger attachment, E2E testing feedback loops; `media-harness-blueprint.md` — Asset management, visual diffing, multimodal critic agents | P2 | Q281-Q300 |
| `17-reference-specs/` | `minimal-kernel-spec.md` — The final synthesized specification for the core agent kernel, drawing from all research | P2 | Synthesis |

**Total gap: 9 directories × 1-2 files each = ~12 stub files to create.**

---

## 2. Dashboard Improvement Roadmap

### P0 — Functional Fixes (should do next)

| Feature | Description | Why It Matters |
|---------|-------------|----------------|
| **Keyboard navigation** | `↑`/`↓` arrows to move between sidebar files, `Enter` to open, `Escape` to focus search | Power users (you) will navigate 26+ files constantly — mouse-only is slow |
| **ToC scroll-spy** | Highlight the current heading in the right-side Table of Contents as you scroll through a long document | Long documents like Research1 (214 lines) and Research2 (469 lines) need positional awareness |
| **Auto-expand active folder** | When navigating to a file via an internal `[link](../path.md)`, auto-expand its parent folder in the sidebar | Currently internal links load the file but the sidebar doesn't visually update |
| **Sidebar file count badges** | Show `(4)` next to folder names indicating how many files are inside | Helps you instantly see which directories have content vs which are empty |
| **Status indicators in sidebar** | Show a small ✅ or ⬜ dot next to each file based on whether `Status: ✅` or `Status: ⬜` appears in its content | At a glance you know what's done and what needs work |

### P1 — Content & Navigation Features

| Feature | Description | Why It Matters |
|---------|-------------|----------------|
| **Full-text content search** | Search inside the *content* of all markdown files, not just filenames. Show matching snippets with highlights | You have 200+ KB of research text — filename search alone won't find "Polyphonic Recall" or "TEMPR" |
| **File metadata header** | When a document loads, render a styled card at the top showing: Status, Priority, Word Count, Reading Time (~X min), Last Modified | Gives instant context before you start reading |
| **Prev / Next navigation** | "← Previous" and "Next →" buttons at the bottom of each document for sequential reading | When studying the curriculum in order, you shouldn't have to keep reaching for the sidebar |
| **Breadcrumb folder click** | Make breadcrumb segments clickable — clicking a folder name shows all files in that folder | Currently the breadcrumb is display-only |
| **Recently Viewed** | A collapsible "Recent" section at the top of the sidebar showing the last 5 opened files (persisted in localStorage) | When jumping between teardowns and architecture docs, quick-switch is essential |
| **Back/Forward history** | Browser-style back/forward buttons (or `Alt+←`/`Alt+→`) to navigate between previously viewed files | Standard navigation pattern that's currently missing |

### P2 — Polish & Delight

| Feature | Description |
|---------|-------------|
| **Dark/Light mode toggle** | A button in the top bar to switch themes, persisted in localStorage |
| **Sidebar drag-to-resize** | A draggable handle on the sidebar edge to adjust its width |
| **Bookmark/pin files** | Star/pin frequently accessed files to the top of the sidebar |
| **Collapsible sections** | Add `<details>` support so long Q&A sections can be collapsed |
| **Animated page transitions** | Subtle fade-in when switching between documents |
| **Export to PDF** | A button that renders the current document to a clean, printable PDF |
| **Word count stats footer** | A small footer showing total repository word count and completion percentage |

---

## 3. Research Execution Plan

### Phase 1 — Complete Core Teardowns (P0)

The teardowns are the foundation. Every architecture document depends on patterns extracted from these:

| Step | File | Approach | Est. Effort |
|------|------|----------|-------------|
| 1 | `01-teardowns/pi-agent.md` | Use Example Prompt 1 from `implementation_plan.md`. Swap "Hermes" → "Pi". Focus on: TypeScript monorepo, `pi-agent-core` loop, `pi-ai` provider abstraction, JSONL session trees, extension API, zero built-in permissions. Pi is the *reference minimal harness*. | Medium |
| 2 | `01-teardowns/claude-code.md` | Use Example Prompt 1. Focus on: proprietary architecture (what we can infer), YAML plugin manifests, subagent definitions, `permissionMode` classifier, background agents, auto-memory. Note: limited source access — rely on docs + Research2. | Medium |
| 3 | `01-teardowns/comparison-matrix.md` | Synthesis only (no web search needed). Build a detailed feature matrix from Hermes + Pi + Claude Code teardowns + Research2's existing matrix. Add columns for: best-in-class per feature, patterns to adopt, patterns to avoid. | Light |

### Phase 2 — Core Architecture Modules (P0)

These translate teardown patterns into generalizable architecture knowledge:

| Step | File | Key Topics |
|------|------|------------|
| 4 | `02-agent-runtime/agent-loop-design.md` | Synchronous vs async loops, streaming vs batch, error recovery, retry strategies, tool dispatch patterns. Draw from Pi (TS), Hermes (Python), Goose (Rust) loops. |
| 5 | `04-tools-system/tool-contract-spec.md` | JSON Schema tool definitions, self-registration patterns, execution backend routing, typed input/output contracts. Hermes `@registry.register` vs Cline `createTool()` vs MCP. |
| 6 | `05-security/permission-model.md` | Three-layer model (Policy → Approval → Sandbox), command classifiers (smart/manual/off), file denylists, container isolation tiers, YOLO mode. |
| 7 | `03-context-engineering/prompt-architecture.md` | Layered prompt stacking (identity → tools → skills → history), tiered instruction files (global vs project), progressive disclosure, context rot mitigation. |

### Phase 3 — Extended Subsystems (P1)

| Step | File | Key Topics |
|------|------|------------|
| 8 | `06-memory-systems/memory-classes.md` | Working/Session/Episodic/Semantic/Procedural memory taxonomy. Mnemosyne (Polyphonic Recall), Hindsight (TEMPR + CARA), MemGraphRAG. Pluggable provider interface design. |
| 9 | `08-subagents/gauntlet-loop.md` | Decomposition → Builder → Blind Critic → Deterministic Benchmark → Ratchet. Typed JSON returns. Subagent isolation and least-privilege. |
| 10 | `07-sessions/session-tree-model.md` | DAG vs tree session storage, JSONL format, parent/child pointers, fork/clone/branch commands, FTS5 search, compression lineage tracking. |
| 11 | `12-ui/tui-architecture.md` | Differential rendering, context thermometers, cost tracking, event-driven updates, extension-contributed panels. |
| 12 | `14-open-source-tools/licensing-matrix.md` | MIT vs Apache vs AGPL audit. Firecrawl warning. Dependency scanning strategy. Commercial safety checklist. |

### Phase 4 — Create Missing Stubs + Research (P2)

Create stub files in the 9 empty directories listed in Section 1.4, then enrich them using the SKILL.md methodology.

### Phase 5 — Synthesis

| Step | File | Description |
|------|------|-------------|
| Final | `17-reference-specs/minimal-kernel-spec.md` | The capstone document. A complete, implementable specification for a minimal agent harness kernel, synthesized from all research. This is the blueprint you will use to actually build harnesses for resale. |

---

## 4. Operational Notes

### Build Script (`build-ui.js`)
- **Current HTML size:** 254 KB (26 files embedded). Will grow to ~500-700 KB as all stubs are enriched. Not a concern until it exceeds ~3 MB.
- **Rebuild command:** `node build-ui.js` — takes <1 second.
- **Excluded from build:** `scratch/`, `.git/`, `node_modules/`, `artifacts/`.
- **Not excluded but should consider:** `build-ui.js` and `index.html` are already excluded (not `.md` files).

### Repository Hygiene
- The `scratch/` directory currently contains empty subdirectories (`mini-loop/`, `tool-contract/`, `tui-prototype/`). These are placeholders for future prototyping.
- No `node_modules/` or `package.json` exist — the project is pure markdown + one vanilla Node script. Keep it this way.
- All content lives on D: drive. Nothing is stored on C: drive.

### Research Agent Workflow Reminder
```
1. Pick a stub file from the priority list above
2. Paste the appropriate Example Prompt from implementation_plan.md
3. Agent reads SKILL.md → does web research → writes enriched doc
4. You review the output
5. Run `node build-ui.js` to refresh the HTML dashboard
```
