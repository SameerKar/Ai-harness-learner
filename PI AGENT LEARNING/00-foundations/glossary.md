# Glossary — AI Agent Harness Terminology

> Master reference for all terms used across this learning program. Every concept first-mentioned in any document should link back here.

---

## Core Concepts

### Agent
An autonomous system that perceives its environment, makes decisions, and takes actions to achieve goals. In this context: an LLM + harness working together.

### Agent Harness
The complete infrastructure surrounding a language model — tools, memory, permissions, context, UI — that makes it operational. See: [What Is a Harness](what-is-a-harness.md).

### Agent Loop
The core execution cycle: `User Input → Prompt Assembly → Model Call → Tool Execution → Result → Loop/Complete`. The heartbeat of every agent.

### Agent Runtime
The engine that executes the agent loop, manages state transitions, handles errors, and coordinates all subsystems.

---

## Architecture Terms

### A2A (Agent-to-Agent) Messaging
A communication protocol allowing one agent to delegate tasks, pass context, or interact directly with another isolated agent profile.

### Context Window
The maximum number of tokens a model can process in a single call. Managing this is a core harness responsibility.

### Compaction
Automatic summarization of old conversation history when the context window fills up. Preserves key decisions while freeing space. See: [Compaction Algorithms](../03-context-engineering/compaction-algorithms.md).

### Event Bus
A publish-subscribe system where agent actions (tool calls, model responses, errors) emit events that TUI, telemetry, and plugins consume.

### Gauntlet Loop
An adversarial multi-agent pattern: Builder creates → Critic evaluates blind → Ratchet forces iteration until quality bar is met. See: [Gauntlet Loop](../08-subagents/gauntlet-loop.md).

### Progressive Disclosure
Only loading skills/tools into the prompt when they're needed for the current task, rather than injecting everything at startup.

### Prompt Caching
Provider-specific optimization where repeated prompt prefixes are cached server-side, reducing cost and latency on subsequent calls.

---

## Extension System

### Skill
A set of instructions (usually Markdown) that teach the agent how to perform a specific task. Loaded on-demand. Read-only knowledge.

### Tool
A function the agent can invoke to interact with the world (read files, run commands, search web). Has typed inputs/outputs.

### Extension
A code module (TS/JS/Python) that hooks into the agent's lifecycle, adding tools, commands, or behaviors.

### Plugin
Broader than extension — can include tools, hooks, memory providers, UI components. Often a package with a manifest.

### Hook
A callback that fires on a specific lifecycle event (e.g., `pre_prompt`, `post_tool_call`). Used by extensions/plugins.

### MCP (Model Context Protocol)
An open standard (JSON-RPC over stdio/HTTP) for connecting AI agents to external tools and data sources. See: [MCP Deep Dive](../04-tools-system/mcp-deep-dive.md).

### ACP (Agent Communication Protocol)
Protocol for agent-to-agent messaging and delegation.

---

## Memory Terms

### Working Memory
The current conversation context — what the model can "see" right now.

### Session Memory
Facts and state from the current conversation session, persisted to disk.

### Episodic Memory
Records of past actions and their outcomes (what happened when we tried X).

### Semantic Memory
General knowledge and facts stored long-term (project uses Python 3.12, user prefers tabs).

### Procedural Memory
Learned skills and workflows (how to deploy to staging, how to run tests).

### Mnemosyne
A local SQLite-based memory system using Polyphonic Recall (4 parallel retrieval strategies). See: [Mnemosyne Analysis](../06-memory-systems/mnemosyne-analysis.md).

### Hindsight
An advanced memory framework using TEMPR (retrieval) and CARA (reasoning). Stores World Facts, Experience Facts, Observations, and Mental Models. See: [Hindsight Analysis](../06-memory-systems/hindsight-tempr-cara.md).

### TEMPR
Temporal Entity Memory Priming Retrieval — Hindsight's multi-strategy search using Reciprocal Rank Fusion.

### CARA
Coherent Adaptive Reasoning Agents — Hindsight's system for evaluating new evidence against existing knowledge with configurable psychological dispositions.

### MemGraphRAG
A multi-agent system for building conflict-free knowledge graphs from unstructured text. Three layers: Schema, Fact, Passage. See: [MemGraphRAG](../06-memory-systems/memgraphrag.md).

### Polyphonic Recall
Running 4 parallel retrieval strategies (vector, graph, fact-based, temporal) and fusing results via deterministic re-ranking.

---

## Security Terms

### Permission Gate
A middleware interceptor that scans every tool payload against rules before execution.

### Sandbox
An isolated execution environment (container, VM) that limits what the agent can affect.

### UITL (User-in-the-Loop)
Forcing explicit human authorization before dangerous operations proceed.

### Capability-Based Security
Instead of blacklisting dangerous operations, explicitly whitelisting allowed capabilities.

---

## Session Terms

### Session Tree
Conversation history stored as a directed acyclic graph (DAG) where messages have parent pointers, enabling branching.

### Fork
Creating a new conversation branch from an existing point in the session tree.

### Clone
Duplicating an entire session branch into a new independent session.

---

## UI Terms

### TUI (Terminal User Interface)
Rich terminal-based interface with panels, meters, and interactive elements (not just text output).

### Differential Rendering
Updating only changed portions of the terminal display, avoiding flicker.

### Context Thermometer
A visual gauge showing current token usage vs. maximum window size.

### Steering
User intervention mid-execution to redirect the agent without canceling the current task.

---

## Provider Terms

### Provider Abstraction
A unified API layer that normalizes different LLM APIs (OpenAI, Anthropic, Google) into a single interface.

### Model Routing
Automatically selecting the best model for a given task based on capabilities, cost, and availability.

### OpenRouter
A third-party service that provides a single API endpoint to access many different models.

---

## Licensing Terms

### MIT License
Permissive open-source license. Commercial use, modification, distribution all allowed. Attribution required.

### Apache 2.0
Permissive license similar to MIT but includes patent grant. Commercial use allowed.

### AGPL-3.0
Copyleft license. If you modify and deploy as a service, you must release source. **Dangerous for commercial SaaS.** (Example: Firecrawl core is AGPL.)

### Copyleft
License requirement that derivative works must use the same license. Can be "viral."
