# Hermes Agent — Source-Level Teardown

> **Status:** ✅ Researched
> **Priority:** P0
> **Questions addressed:** Q16-Q43
> **Last updated:** 2026-08-20

## Overview & Philosophy
Hermes Agent is an open-source, autonomous AI agent framework designed by NousResearch. What makes Hermes architecturally distinct is its intense focus on observability, multi-layered security, and advanced persistent memory. It operates as a true autonomous harness rather than a simple chat wrapper, equipped with dynamic tool registries, an agent-to-agent (A2A) communication protocol, and pluggable memory providers.

## Repository Structure
The Hermes Agent is organized as a Python monorepo.
```
hermes-agent/
├── run_agent.py         ← Main execution engine and `AIAgent` class
├── run_tools.py         ← Tool execution dispatcher and sandbox backends
├── context_compressor.py← Context and prompt cache management
├── prompt_caching.py    ← Short-term memory scratchpad interactions
├── tools/
│   ├── registry.py      ← Central self-registration tool registry
│   └── [specific tools] ← e.g., shell, filesystem, search tools
├── plugins/
│   ├── memory/          ← Pluggable memory providers (SQLite, vector DBs)
│   └── ...              ← Other community or core plugins
├── website/docs/        ← Official documentation
└── ...
```

## Agent Loop — How It Actually Runs
The core loop is managed synchronously within `run_agent.py` via the `AIAgent` class.
1. **Input:** Reads user message.
2. **Context Assembly:** Selects provider, builds system prompt (identity + tools + skills + history).
3. **Model Invocation:** Calls the model.
4. **Parsing:** Parses output. If it detects a tool call, execution pauses.
5. **Execution:** Dispatches tool call to `run_tools.py`, which executes it on the designated backend.
6. **Continuation:** Feeds tool results back to the LLM. The loop repeats until a final answer is produced.

## Tool System
- **Self-Registration:** Tools self-register at import time using a decorator pattern (`@registry.register`) defined in `tools/registry.py`.
- **Execution Backends:** Tools are dispatched by `run_tools.py` across up to 7 execution backends (local, Docker, SSH, Singularity, Modal, etc.).
- **Schema:** Tools declare strongly-typed input/output schemas in Python which are translated into JSON Schemas for the LLM system prompt.

## Memory Architecture
- **Built-in Memory:** Includes a default SQLite memory database.
- **Pluggable Interface:** Supports pluggable memory providers via `plugins/memory/`. Developers can implement interfaces for vector DBs or Hindsight.
- **Retrieval:** The agent can explicitly invoke memory tools (e.g., "Store this information") to persist data across sessions.
- **Profile Isolation:** Memory is scoped per profile, preventing cross-contamination.

## Context & Compaction
- **Compression:** Managed by `context_compressor.py`. When the context grows too large, older chunks of conversation are summarized by the model.
- **Caching:** Integrates with Anthropic's prefix caching (`prompt_caching.py`) to reduce costs on long sessions.
- **Lineage:** When context is compressed, session IDs track parent-child lineage so users can trace back to pre-compressed states.

## Session Management
- **Storage:** Sessions are stored per-profile in SQLite (`~/.hermes/profiles/<name>/sessions/`) using FTS5 for full-text search capability.
- **Mechanics:** Each session has a unique ID. Users can resume, fork, or branch sessions. Cron jobs can optionally spawn fresh, stateless sessions.

## Plugin & Extension System
- **Discovery:** Python plugins are loaded from `~/.hermes/plugins/`, local `./hermes/plugins/`, or via standard `pip` entry points.
- **Capabilities:** Plugins can register tools, lifecycle hooks (e.g., pre-prompt, post-prompt), and CLI commands (via Click).
- **Special Plugins:** Dedicated support for memory provider plugins and context engine plugins.

## Security Model
Hermes uses a defense-in-depth approach:
- **Authorization:** Allow/deny lists for users (e.g., in Telegram/Discord gateway mode).
- **Dangerous Command Classifier:** An LLM-based classifier flags risky shell commands. Configurable modes: `smart` (auto-approve safe, ask on dangerous), `manual` (always ask), or `off`.
- **Denylists:** File operations check against a denylist (e.g., preventing edits to `.secret`).
- **Sandboxing:** Tool execution can be routed to isolated containers (Docker, Modal, Singularity).
- **Bypass:** Users can use the `--yolo` flag to bypass all confirmation prompts.

## Subagent & A2A
- **A2A Messaging:** Hermes implements Agent-to-Agent communication (v1.0), allowing the main agent to delegate tasks to other isolated profiles/agents.
- **Delegation:** Agents hand off tasks by messaging named profiles (e.g., a "writer" agent passing context to a "researcher" agent).

## Provider Abstraction
- **Resolver:** Uses a Provider Resolver mapping that pairs `(provider, model)` to specific API endpoints and modes.
- **Support:** Supports 18+ providers natively including Anthropic, OpenAI, Azure, Google, Ollama, and Baidu.
- **Switching:** Model switching is handled gracefully via configuration without altering tool contracts.

## UI & Observability
- **CLI/TUI:** Features progress spinners, explicit tool-call callbacks, and interactive approvals.
- **Desktop:** Hermes Desktop, an Electron-based app, offers multiple windows and a GUI for plugins.
- **Event Bus:** An asynchronous event callback system broadcasts all tool starts, ends, and message events. This fulfills the core design principle of "observable execution."

## Configuration
- **Format:** YAML-based configuration (`~/.hermes/config.yaml`).
- **Isolation:** Each profile gets its own isolated home directory (`~/.hermes/profiles/<name>`).
- **Overrides:** CLI arguments (e.g., `hermes -p <name>`) and dynamic CLI commands (`hermes config`) can override YAML settings.

## Licensing & Commercial Use
- **License:** MIT License. It is fully permissive and safe for commercial use.
- **Dependencies:** Built on standard permissive Python libraries, explicitly avoiding viral copyleft (GPL/AGPL) traps.

## Answered Questions
### Q16: What is the process architecture? 
**Answer:** A Python monorepo structure with key modules handling execution (`run_agent.py`), tool dispatch (`run_tools.py`), and context (`context_compressor.py`).
### Q17: Where is the main agent loop? 
**Answer:** Found in `run_agent.py` within the `AIAgent` class.
### Q18: Where is model invocation? 
**Answer:** Managed by a Provider Resolver that maps model names to API endpoints natively in Python.
### Q19: Where are tools registered? 
**Answer:** In `tools/registry.py` using a self-registration decorator pattern.
### Q20: How are tools serialized for models? 
**Answer:** Python schema definitions are converted into JSON Schemas and injected into the system prompt.
### Q21: How are tool calls validated? 
**Answer:** The LLM's JSON output is checked against the registered tool's input schema before execution.
### Q22: Where does permission checking occur? 
**Answer:** Before dispatching to `run_tools.py`, a dangerous command classifier and file denylists intercept the payload.
### Q23: Where does tool execution occur? 
**Answer:** In `run_tools.py`, which routes the command to one of 7 execution backends (local, Docker, etc.).
### Q24: How is session state stored? 
**Answer:** In a SQLite database per profile using FTS5 for searchability.
### Q25: How is context assembled? 
**Answer:** The prompt is built sequentially: System Identity + Tool Schemas + Skills + Chat History.
### Q26: How is context compressed? 
**Answer:** `context_compressor.py` summarizes old chunks, supported by Anthropic prefix caching.
### Q27: How are events emitted? 
**Answer:** Through an asynchronous event bus that broadcasts lifecycle and tool callbacks.
### Q28: How is streaming represented? 
**Answer:** Through provider-specific streaming adapters wrapped in the core event bus.
### Q29: How are errors propagated? 
**Answer:** The agent loop intercepts tool failures or API errors and can retry using fallback providers.
### Q30: How is cancellation implemented? 
**Answer:** Handled via asynchronous task cancellation within the Python event loop.
### Q31: How are subagents spawned? 
**Answer:** Through the A2A (Agent-to-Agent) messaging v1.0 protocol.
### Q32: How do subagents receive context? 
**Answer:** By passing isolated messages between defined profiles.
### Q33: How are subagent permissions defined? 
**Answer:** Permissions are isolated per-profile in the YAML config.
### Q34: How is memory stored? 
**Answer:** In a default SQLite DB, with support for pluggable memory providers (like vector DBs).
### Q35: How are extensions loaded? 
**Answer:** Via `pip` entry points or by scanning `~/.hermes/plugins/`.
### Q36: How are skills loaded? 
**Answer:** Injected on-demand into the system prompt.
### Q37: How are plugins loaded? 
**Answer:** Directory scanning combined with Python's dynamic import mechanisms.
### Q38: How is configuration discovered? 
**Answer:** By reading the YAML file at `~/.hermes/config.yaml`.
### Q39: What is global vs project-local? 
**Answer:** Isolated entirely by profile (each profile has its own config and sessions).
### Q40: What is dynamically reloadable? 
**Answer:** Profiles and LLM provider settings via CLI commands.
### Q41: What is hot-reloadable? 
**Answer:** Tool registries can dynamically pick up new pip entry points.
### Q42: What is persisted? 
**Answer:** Sessions, memories, and configurations are persisted to SQLite and YAML.
### Q43: What is intentionally NOT persisted? 
**Answer:** Stateless cron-job sessions and raw, uncompressed chat histories that exceed token limits.

## Key Takeaways
- **Self-Registering Tools:** The `@registry.register` pattern in Python makes adding tools frictionless and decoupled.
- **Pluggable Memory:** Providing an interface for memory (rather than hardcoding vector DBs) allows scaling from SQLite to complex Hindsight setups.
- **A2A Delegation:** Subagents aren't just separate prompts; they are isolated profiles communicating via a formal messaging protocol.
- **Defense in Depth:** Security isn't a binary sandbox; it's a tiered system of allowlists, classifiers, and optional containerization.
- **Observable Execution:** Every action emits a broadcastable event, making the agent loop transparent to CLI, TUI, and GUI consumers.

## References
- [Hermes Agent GitHub Repository](https://github.com/NousResearch/hermes-agent) — Official source code and documentation.
- [Research1](../Research1.md) — Architectural patterns, memory frameworks, and Gauntlet Loop theory.
- [Research2](../Research2.md) — Capability matrix and comparative teardown data.
