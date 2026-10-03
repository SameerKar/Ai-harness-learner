# **Architecting State-of-the-Art AI Agent Harnesses: System Design, Memory, and Extensibility**

## **The Paradigm of Harness Engineering and Commercial Specialization**

The evolution of autonomous artificial intelligence has definitively shifted from the optimization of foundational model weights to the engineering of the environments in which those models operate. A model alone, regardless of its parameter count or benchmark scores, is fundamentally stateless, unconstrained, and highly prone to hallucination. The true realization of an agent's capability is dictated entirely by its harness—the encompassing infrastructure that provides tooling, state management, verification loops, and persistent memory1. A harness does not inherently make a model smarter; rather, it establishes a closed-loop working system that prevents the model from declaring victory prematurely, orchestrates complex sub-agent delegations, and guarantees that every task execution leaves a verifiable, clean state1.  
For commercial applications where specialized agents must perform domain-specific tasks—such as a dedicated media generation agent or a full-stack software development agent—monolithic, "do-everything" architectures inevitably fail. They suffer from context bloat, prompt drift, and reasoning spirals. Instead, the modern standard dictates building modular, heavily constrained harnesses. By isolating the core execution engine, developers can package and distribute targeted harnesses for resale, enabling a user to purchase a streamlined coding agent like OpenCode or a creative media generator without overlapping toolsets. This report provides an exhaustive architectural blueprint for constructing these frontier-grade AI agent harnesses, drawing upon the system designs of the pi coding agent, Claude Code, Hindsight, Hermes, and the Gauntlet Loop.

## **Foundational System Design: The Five-Subsystem Model**

Historically, agent frameworks attempted to bundle every conceivable tool and instruction into a monolithic prompt, leading to context exhaustion. The contemporary approach, championed by minimal harnesses like the pi coding agent, relies on a radically constrained core. The design thesis dictates that a base agent requires exactly four fundamental tools: read, write, edit, and bash, governed by a system prompt of fewer than 1,000 tokens2. Every other capability must be strictly opt-in, progressively disclosed only when contextually relevant.  
To achieve this without sacrificing capability, state-of-the-art harnesses distribute responsibilities across a Five-Subsystem Model1. Any commercially viable harness built for resale must implement these five layers natively.

| Subsystem | Primary Responsibility | Implementation Mechanism | Example Failure if Omitted |
| :---- | :---- | :---- | :---- |
| **Instruction** | Defines boundaries, tech stack, and hard constraints. | Structured AGENTS.md or SYSTEM.md files loaded dynamically based on the working directory1. | The agent uses the wrong package manager or ignores architectural patterns. |
| **Tool** | Provides execution capabilities while enforcing least privilege. | Model Context Protocol (MCP) servers, typed TypeScript extensions, and intercepted system shells3. | The agent hallucinates shell commands it cannot run, blocking the workflow. |
| **Environment** | Ensures reproducible execution states. | Dependency lock files, devcontainers, or isolated Kubernetes/UCloud sandboxes1. | Code works in the agent's isolated runtime but fails in the host environment. |
| **State** | Manages cross-session continuity and progress tracking. | Tree-structured session logs (JSONL), FTS5 SQLite databases, and PROGRESS.md state tracking1. | The agent enters an infinite loop, endlessly repeating previously failed actions. |
| **Feedback** | Implements automated verification and evaluation. | End-to-end test execution, linters, static analysis, and adversarial sub-agent critics1. | The agent declares victory on broken code, requiring human intervention. |

The repository itself must become the system of record1. Anything the agent cannot see in the repository practically does not exist. The instruction subsystem utilizes a tiered approach to context. A global \~/.pi/agent/SYSTEM.md file defines baseline behavior, while project-local .pi/SYSTEM.md and AGENTS.md files append domain-specific constraints2. These instruction files should serve as high-level directory maps rather than exhaustive encyclopedias, pointing the agent to a docs/ directory for deeper, on-demand reading1.

### **Achieving Agnosticism in the Core Engine**

To ensure the harness remains highly marketable, it must exhibit strict model, tool, and language agnosticism. The rapid iteration of frontier AI models guarantees that today's leading Large Language Model (LLM) will be obsolete within months. A commercially viable harness decouples the agentic logic from the underlying model provider by implementing an abstraction layer (e.g., @earendil-works/pi-ai) that unifies the APIs of Anthropic, OpenAI, Google, DeepSeek, and local Ollama models2.  
The harness standardizes tool-calling schemas, automatically converting an internal JSON Schema representation into Anthropic's XML-style tool declarations or OpenAI's native function calling formats under the hood2. This allows the end-user to switch models mid-session—for instance, using a /model hotkey to swap from Claude to a local DeepSeek instance—without breaking the context tree or altering the system state2. Furthermore, the system must not assume the presence of a specific language runtime (like Node.js or Python). Native binaries such as ripgrep, find, or sed should be linked directly into the harness process without relying on expensive fork-exec shell commands, ensuring the agent can operate across operating systems seamlessly9.

## **Security, Permissions, and Runtime Sandboxing**

Autonomous agents with filesystem access represent a severe security risk. A commercial harness cannot rely on the LLM "promising" to be safe via its system prompt. Security must be enforced at the runtime execution layer to prevent unauthorized folder deletion, the dropping of production databases, or the exfiltration of .env secrets.

### **Interception and Permission Gates**

Harnesses must implement a middleware interceptor that scans every generated tool payload before it reaches the execution kernel4. Using rule-based permission gates, such as the rules.json configuration patterns found in pi-agent-extensions, the harness evaluates commands against strict regular expressions11.  
Actions like recursive deletes (rm \-rf), sudo execution, destructive git operations (git push \-f), writes to raw devices (\> /dev/sda), or whole-tree scans are immediately flagged11. When a flagged action is detected, the harness suspends the event loop and triggers a User-in-the-Loop (UITL) Terminal User Interface (TUI) prompt, forcing explicit human authorization before proceeding4. This effectively neutralizes prompt injection attacks aimed at resource destruction while allowing benign read operations to proceed autonomously.

### **Tiered Runtime Isolation**

Beyond command interception, the execution environment itself must be sandboxed based on the user's risk tolerance. Modern harnesses offer configurable isolation tiers:

* **Native Execution:** Fast but dangerous. Best suited only for heavily audited, local repositories where the agent acts as an integrated IDE assistant.  
* **Containerized Execution:** Routing all bash and write commands into a local Docker container or a remote sandbox5. This ensures that even if the agent acts maliciously, the host machine remains untouched.  
* **Micro-VMs:** Utilizing tools like Firecracker or Gondolin extensions to route commands into hardware-isolated Linux micro-VMs5. This is mandatory if the harness is sold as a cloud-hosted Software-as-a-Service (SaaS), guaranteeing cryptographic separation between tenants.

## **UI, UX, and Observability: The DeepSeek Inspiration**

Developers will not trust an autonomous system if it operates as a black box. Observability must be baked directly into the user interface, providing real-time telemetry on the agent's internal state. Taking inspiration from the DeepSeek harness, Hermes, and monopi extensions, the interface must prioritize dense information display without causing visual fatigue.

### **Advanced Terminal Interfaces (TUI) and Differential Rendering**

A professional TUI must utilize differential rendering to update data streams without screen flickering2. The interface should include a persistent, rich footer or status line displaying critical telemetry. This requires intercepting lifecycle events (e.g., tool\_call, message\_update) and appending structured metadata to the UI state4.  
A highly customized TUI, similar to the custom-footer extension in monopi, displays a wealth of real-time metrics14. This includes the active model name alongside its current "thinking-level" indicator, the precise working directory, the active git branch, and the number of active subagents14. Most critically, it displays real-time context window gauges (e.g., 12.3k/200k | 6%) that warn users when compaction is imminent, as well as financial tracking that calculates running session costs based on the active provider's pricing tier (e.g., $0.42)14.

### **Telemetry, Auditing, and Configuration Editing**

To support professional workflows, the harness must track historical usage comprehensively. Extensions like pi-usage-extension parse historical session files to generate braille line charts directly in the terminal, visualizing token expenditure, cache hits, and reasoning token usage over time15. Users can filter this data by provider or model to audit exactly which subagent consumed the most resources15.  
Furthermore, the TUI should allow the agent to edit its own configuration files. Rather than forcing the user to manually adjust settings.json, the agent should be able to manipulate its own themes, tool permissions, and model fallbacks in place, executing a /reload command to apply the changes dynamically8. Every tool execution should log precise metadata—start times, end times, payload sizing, and context snapshots—ensuring that developers can profile slow-running agents and identify bottlenecks in custom tools14.

## **Context Engineering and Prompt Management**

As tasks run continuously, they suffer from "context rot"—the accumulation of intermediate reasoning steps, failed tool outputs, and minor corrections that dilute the model's attention mechanism and bloat the prompt cache. To mitigate this, the harness must implement automated prompt compaction and intelligent session tracking.

### **Tree-Structured Histories**

Unlike traditional chatbots that treat conversations linearly, agent harnesses must treat sessions as directed acyclic graphs (DAGs) or tree structures8. Systems like pi and OpenClaw store sessions as line-feed delimited JSONL files representing this tree2. Each message node contains a pointer to its parent. This architecture allows developers to utilize commands (e.g., /tree) to navigate historical states, fork sessions, or clone active branches into entirely new files2. If a long-running agent task fails, the human operator or an automated supervisor can branch off from a previous, stable state rather than starting from zero, drastically reducing token waste.

### **Prompt Compaction via Threadshift**

When context usage reaches a predefined threshold (e.g., 70% of the maximum token window), the harness must trigger a background summarization event16. Extensions like pi-threadshift automate this seamlessly. Threadshift checks the context usage percentage after every completed agent turn16.  
If the threshold is breached, Threadshift pauses the run. A secondary, cheaper model compresses the historical reasoning into a dense, structured summary, preserving the terminal state of the filesystem, the current goal, and the list of proven negative constraints (what *not* to try again)16. It captures the current Git working-tree summary and writes a private Markdown handoff to a staging directory16. The original dense history is saved to disk for human auditing, while the active context window is flushed and replaced with the synthesized summary, allowing the agent to continue its task indefinitely without degrading performance.

## **Cognitive Architectures: Persistent Memory Systems**

If prompt compaction manages short-term context, persistent memory systems govern long-term capability compounding. An agent must not start from zero on every session. The industry has diverged into several competing architectural philosophies for agent memory, ranging from highly efficient local databases to complex, multi-layered cognitive models. Choosing the correct memory system is vital when specializing a harness for coding versus research.

### **Layer 1: Mnemosyne and Polyphonic Recall**

For fully local, highly efficient coding harnesses, architectures modeled after Mnemosyne provide a robust solution. Mnemosyne operates on the BEAM architecture, relying entirely on local SQLite databases equipped with vector search (sqlite-vec) and full-text search (FTS5)17.  
The defining characteristic of this architecture is Polyphonic Recall. Rather than relying solely on cosine similarity—which often retrieves semantically similar but contextually irrelevant memories—polyphonic recall runs four parallel retrieval strategies17:

> 1. **Vector Search:** For semantic and conceptual matching.  
> 2. **Graph Traversal:** For entity relationship mapping.  
> 3. **Fact-based Search:** For explicit structured assertions (subject-predicate-object triples).  
> 4. **Temporal Search:** For recency-weighted context.

These retrieval streams are fused using deterministic re-ranking. Furthermore, the system employs Veracity Consolidation—a Bayesian confidence scoring mechanism that actively resolves contradictions17. If a new memory contradicts an old one, the system does not simply overwrite it. It assigns confidence tiers (e.g., explicitly stated facts rank higher than inferred facts) and stores the conflict resolution17. This ensures the agent maintains a logically consistent worldview across sessions.

### **Layer 2: Hindsight, TEMPR, and CARA**

For enterprise harnesses requiring human-like reflection and user profiling (such as the Hermes agent), the Hindsight memory framework represents the state-of-the-art. Hindsight entirely abandons the concept of storing verbatim conversation snippets, a method popularized by systems like MemPalace19. While MemPalace excels at exact conversation recall for small datasets, it fails catastrophically at scale due to context-stuffing limitations19. Hindsight, conversely, extracts structured facts, resolves entities, and builds a knowledge graph19.  
Hindsight organizes memory into four distinct logical networks:

* **World Facts:** Objective, verifiable information (e.g., "The project uses Python 3.12")20.  
* **Experience Facts:** Records of the agent's own past actions and their outcomes20.  
* **Observations:** Preference-neutral summaries of entities synthesized automatically from underlying facts20.  
* **Mental Models:** User-curated, highly prioritized summaries that dictate agent behavior19.

Hindsight executes memory operations through three primitives: retain(), recall(), and reflect()20. The recall() function is powered by TEMPR (Temporal Entity Memory Priming Retrieval), which utilizes the same four-pronged multi-strategy search as Mnemosyne but scales to multi-million token contexts via Reciprocal Rank Fusion (RRF) and cross-encoder reranking19.  
The reflect() operation is governed by CARA (Coherent Adaptive Reasoning Agents). CARA introduces configurable psychological dispositions—such as Skepticism, Literalism, and Empathy—which mathematically weight how the agent evaluates incoming evidence against historical observations19. If a new fact arrives, CARA identifies candidate opinions via entity overlap, classifies the relationship (reinforce, weaken, contradict, neutral), and updates the opinion network dynamically22. Integrating Hindsight into a custom harness allows an agent to genuinely compound knowledge over time, adapting to user preferences without requiring manual prompt adjustments.

### **Layer 3: MemGraphRAG and Graph-Based Substrates**

When harnessing agents for exhaustive research, media asset management, or deep document parsing, GraphRAG approaches become necessary. Traditional Retrieval-Augmented Generation (RAG) struggles with fragmented corpora, often returning logically conflicting snippets23. MemGraphRAG solves this by introducing a memory-based multi-agent system designed to construct high-quality, conflict-free knowledge graphs from unstructured text23.  
MemGraphRAG utilizes a three-layer memory structure:

* **Schema Layer:** Abstract ontology triples (head type, relation, tail type)26.  
* **Fact Layer:** Concrete relation triples extracted from the corpus26.  
* **Passage Layer:** The original text chunks that support the facts26.

As parallel agents extract data, the shared memory allows them to dynamically resolve logical conflicts and maintain structural connectivity across the corpus, drastically outperforming standard isolated fragment extraction23. Incorporating MemGraphRAG or similar tools like RAGFlow into a media or research harness ensures the agent grounds its outputs in verifiable, globally consistent knowledge12.

## **Subagent Orchestration and the Gauntlet Loop**

A single agent loop is insufficient for complex tasks like full application development or high-fidelity media generation. State-of-the-art harnesses treat the primary LLM not as a solo worker, but as an orchestrator that dynamically spawns, manages, and terminates specialized subagents9.

### **First-Class Subagent Tooling**

Harnesses must provide native APIs for subagent delegation. As seen in frameworks like oh-my-pi and the Claude Code architecture, the primary agent can execute a task tool that fans out into isolated execution environments9. Each subagent receives an independent working directory, a specialized system prompt, and access to a restricted tool surface. Crucially, subagents do not return unstructured prose to the orchestrator. They are constrained to return strictly typed, schema-validated JSON objects9. This architectural choice eliminates prose parsing errors, prevents hallucination propagation, and avoids merge conflicts when parallel subagents report back to the main thread9.

### **The Gauntlet Loop Pattern**

The most advanced implementation of subagent orchestration is the Gauntlet Loop, an adversarial validation pattern that forces autonomous systems to achieve near-human levels of polish29. Originating in AI game development, the Gauntlet Loop prevents an agent from grading its own work, a scenario that almost always results in the agent declaring premature victory1.

| Phase | Agent Role | Execution Mechanism | Objective |
| :---- | :---- | :---- | :---- |
| **Decomposition** | Lead Agent | Analyzes the high-level goal and splits it into discrete, independently improvable components (e.g., physics, UI, networking)6. | Establish a modular roadmap. |
| **Execution** | Builder Subagent | Receives a specific sub-task and generates the required code or media asset using its isolated toolset6. | Produce a candidate artifact. |
| **Adversarial Critique** | Critic Subagent | Evaluates the output entirely blind. It has no access to the Builder’s reasoning, prompts, or history30. | Provide an unbiased assessment. |
| **Deterministic Benchmarking** | Critic Subagent | Compares the output against concrete, real-world reference material (e.g., rendering engine screenshots, hardcoded physics timings, official API documentation) rather than subjective LLM judgment6. | Ensure the output meets a mathematically provable standard. |
| **The Ratchet** | Lead Agent | If the output fails, the Critic returns a strictly formatted gap analysis (identifying the single largest discrepancy). The Builder is forced to iterate. The loop repeats continuously until the concrete quality bar is cleared6. | Compound quality incrementally. |

Integrating the Gauntlet Loop natively into a commercial harness requires implementing persistent screenshotting tools, state-extraction hooks, and deterministic regression testing infrastructure29. For a coding agent harness, this means integrating headless browsers (e.g., Playwright) that the critic agent can use to visually diff the rendered output against a Figma design file or benchmark latency against a reference standard30.

## **Extensions, Skills, and the Open-Source Ecosystem**

A successful commercial harness must not reinvent the wheel; it must act as a seamless routing layer to the vast open-source tooling ecosystem. Attempting to hardcode every capability leads to monolithic bloat. Instead, the harness must leverage progressive skill disclosure and the Model Context Protocol (MCP).

### **Progressive Disclosure and Skill Repositories**

Capabilities must be encapsulated into standard "Skills." Rather than injecting instructions for database querying and API design into the system prompt simultaneously, the harness maintains a skill registry. When an agent identifies a task, it invokes a skill retrieval mechanism (e.g., /skill:name), dynamically injecting the specific prompt templates and tool definitions required for that workflow2.  
Developers can pull heavily vetted skills from open-source repositories. For example, utilizing Matt Pollock's skills repository provides agents with pre-configured abilities like the "grill me" capability or integrations with the "forgetful" MCP, which encodes hundreds of repositories into a queryable knowledge base31. By treating skills like code dependencies, the harness ensures that the prompt cache remains highly optimized, only loading what is strictly necessary for the current task.

### **TypeScript Extension APIs and Prime Agent Integration**

A robust harness must expose a typed extension API (commonly implemented in TypeScript or JavaScript) that allows developers to hook into the agent's lifecycle events (agent\_start, tool\_call, agent\_end)4. This allows for deep customization without altering the core engine.  
For instance, an extension can intercept a standard web fetch and route it through Scrappling, a heavily adopted open-source Python web scraping library33. Scrappling allows AI agents to extract structured data from web pages for a fraction of standard API costs, reducing a 17,000-token full-page fetch to a highly targeted 4,000-token payload33. The harness extension handles this routing transparently, shielding the core LLM from the underlying complexity.  
Similarly, taking inspiration from the Prime Agent, extensions can provide the agent with a live, persistent Python terminal loop34. Unlike standard execution sandboxes that spin up and tear down per command, a persistent terminal allows the agent to declare variables, import libraries, and manipulate data frames iteratively, drastically accelerating data analysis workflows. Tools like Firecrawl and Browser-use can be integrated in the exact same manner, providing headless browser manipulation without burdening the core harness logic.

### **The Model Context Protocol (MCP)**

The defining protocol for tool interoperability is the Model Context Protocol (MCP)3. MCP standardizes how AI agents communicate with external data sources and tools via JSON-RPC over standard input/output (stdio) or HTTP3. By building an MCP adapter into the base harness, the framework instantly gains compatibility with thousands of community-built tools.  
For example, an MCP adapter can dynamically proxy an entire Chrome DevTools server, allowing the agent to manipulate a browser via a single, compact \~200-token proxy tool rather than flooding the system prompt with exhaustive Puppeteer scripts7. This architecture is critical for keeping the harness lightweight while offering enterprise-grade interaction capabilities.

## **Specialized Harness Blueprints: Media vs. Coding**

With the core engine, memory substrates, and extensibility frameworks established, constructing distinct harnesses for resale becomes an exercise in configuration rather than full-stack development.

### **Architecting a Coding Harness**

A harness optimized for software development—drawing inspiration from OpenCode, Cline, and Goose—must prioritize deep system integration and deterministic feedback.

* **Environment & Tooling:** The tool subsystem must feature Language Server Protocol (LSP) connectivity. As demonstrated by oh-my-pi, wiring the LSP into every write command ensures that when the agent renames a variable, all aliased imports and barrel files update simultaneously via workspace/willRenameFiles9. This gives the agent the exact same situational awareness as a human IDE user.  
* **Debugging Capabilities:** The harness must link native binaries directly into the process. If a C binary segfaults, the agent should be able to attach lldb natively, step to the bad pointer, and read the frame9. If a Python process hangs, it should attach debugpy.  
* **Feedback Subsystem:** The Gauntlet Loop must be configured to run end-to-end (E2E) tests. Unit tests are systematically blind to interface mismatches, state propagation errors, and resource leaks1. By enforcing E2E testing, the harness forces the agent to respect architectural boundaries and implement proactive exception handling1.

### **Architecting a Media Generation Harness**

A harness optimized for media generation requires an entirely different set of tools and feedback mechanisms, though it runs on the exact same core engine.

* **Memory & Context:** Media workflows rely heavily on asset metadata and aesthetic consistency. The memory subsystem should utilize MemGraphRAG or RAGFlow to manage visual design documents, brand guidelines, and asset ontologies, ensuring the agent remains aesthetically consistent across sessions26.  
* **Environment & Tooling:** The MCP adapter must connect to rendering engines, headless design tools, and asset APIs. The terminal UI should prioritize displaying image metadata, rendering time, and prompt fidelity scores rather than LSP errors.  
* **Feedback Subsystem:** The Gauntlet Loop's blind critic cannot rely on unit tests. Instead, it must utilize visual diffing tools and multimodal vision models to compare the generated asset against concrete reference screenshots (e.g., comparing lighting, depth, and composition against commercial reference material)6. The ratchet mechanism forces the builder subagent to refine the asset until the vision critic confirms the reference threshold is met30.

## **Conclusion**

Architecting a perfect AI agent harness requires a fundamental shift away from monolithic prompt engineering toward robust systems engineering. To build distinct, commercially viable harnesses for coding, media generation, or data analysis without bloat, developers must establish a minimal, highly constrained core execution loop that relies on exactly four base tools.  
By leveraging progressive skill disclosure, implementing adversarial Gauntlet Loops for verification, utilizing multi-layered memory architectures like Hindsight and Mnemosyne, and standardizing external connections through the Model Context Protocol, developers can create AI agents that are deterministic, safe, and genuinely capable of long-horizon autonomy. A customizable TUI that tracks telemetry, handles prompt compaction via Threadshift, and sandboxes execution via strict permission gates ensures the user remains fully in control. The ultimate value of an agent no longer lies in the model's foundational weights, but in the structural integrity, memory resilience, and observability of the harness that surrounds it.

#### **Works cited**

> 1. [https://walkinglabs.github.io/learn-harness-engineering/en/](https://walkinglabs.github.io/learn-harness-engineering/en/)  
> 2. [https://agentic-ai.readthedocs.io/en/latest/AgentHarness/pi-dev/](https://agentic-ai.readthedocs.io/en/latest/AgentHarness/pi-dev/)  
> 3. model-context-protocol-resources/guides/mcp-server-development-guide.md at main, [https://github.com/cyanheads/model-context-protocol-resources/blob/main/guides/mcp-server-development-guide.md](https://github.com/cyanheads/model-context-protocol-resources/blob/main/guides/mcp-server-development-guide.md)  
> 4. pi/packages/coding-agent/docs/extensions.md at main · earendil-works/pi \- GitHub, [https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/extensions.md)  
> 5. earendil-works/pi: AI agent toolkit: unified LLM API, agent loop, TUI, coding agent CLI, [https://github.com/earendil-works/pi](https://github.com/earendil-works/pi)  
> 6. Claude Opus 5's Gauntlet Loop: How Multi-Agent Iteration Built Playable Browser Games, [https://we0.ai/articles/claude-opus-5-s-gauntlet-loop](https://we0.ai/articles/claude-opus-5-s-gauntlet-loop)  
> 7. Pi Coding Agent Setup Guide \- GitHub Gist, [https://gist.github.com/schpet/85531b6a05a5d8119e859bdec6b0e0b8](https://gist.github.com/schpet/85531b6a05a5d8119e859bdec6b0e0b8)  
> 8. Pi Coding Agent, [https://pi.dev/](https://pi.dev/)  
> 9. GitHub \- can1357/oh-my-pi: AI Coding agent for the terminal — hash-anchored edits, optimized tool harness, LSP, Python, browser, subagents, and more, [https://github.com/can1357/oh-my-pi](https://github.com/can1357/oh-my-pi)  
> 10. pi/packages/coding-agent/examples/sdk/06-extensions.ts at main · earendil-works/pi, [https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/sdk/06-extensions.ts](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/sdk/06-extensions.ts)  
> 11. rytswd/pi-agent-extensions \- GitHub, [https://github.com/rytswd/pi-agent-extensions](https://github.com/rytswd/pi-agent-extensions)  
> 12. RAGFlow is a leading open-source Retrieval-Augmented Generation (RAG) engine that fuses cutting-edge RAG with Agent capabilities to create a superior context layer for LLMs · GitHub, [https://github.com/infiniflow/ragflow](https://github.com/infiniflow/ragflow)  
> 13. agent-harness-generator · GitHub Topics, [https://github.com/topics/agent-harness-generator](https://github.com/topics/agent-harness-generator)  
> 14. ifiokjr/monopi: One-click setup for pi-coding-agent — extensions, themes, prompts, skills, and ant-colony swarm. Like oh-my-zsh for pi. \- GitHub, [https://github.com/ifiokjr/monopi](https://github.com/ifiokjr/monopi)  
> 15. @tmustier/pi-usage-extension \- npm, [https://www.npmjs.com/package/@tmustier/pi-usage-extension](https://www.npmjs.com/package/@tmustier/pi-usage-extension)  
> 16. pi-threadshift 0.1.0-beta.3 on npm \- Libraries.io \- security & maintenance data for open source software, [https://libraries.io/npm/pi-threadshift](https://libraries.io/npm/pi-threadshift)  
> 17. Memory Providers: I tested them all : r/hermesagent \- Reddit, [https://www.reddit.com/r/hermesagent/comments/1tms3g6/memory\_providers\_i\_tested\_them\_all/](https://www.reddit.com/r/hermesagent/comments/1tms3g6/memory_providers_i_tested_them_all/)  
> 18. Awesome-AI-Memory/README.md at main \- GitHub, [https://github.com/IAAR-Shanghai/Awesome-AI-Memory/blob/main/README.md](https://github.com/IAAR-Shanghai/Awesome-AI-Memory/blob/main/README.md)  
> 19. MemPalace vs Hindsight: AI Agent Memory Compared \- Vectorize, [https://vectorize.io/articles/mempalace-vs-hindsight](https://vectorize.io/articles/mempalace-vs-hindsight)  
> 20. Hindsight \- Vectorize, [https://hindsight.vectorize.io/](https://hindsight.vectorize.io/)  
> 21. Agentic Memory Hindsight Beats RAG In Long-Term AI Reasoning \- Open Source For You, [https://www.opensourceforu.com/2025/12/agentic-memory-hindsight-beats-rag-in-long-term-ai-reasoning/](https://www.opensourceforu.com/2025/12/agentic-memory-hindsight-beats-rag-in-long-term-ai-reasoning/)  
> 22. Hindsight is 20/20: Building Agent Memory that Retains, Recalls, and Reflects \- arXiv, [https://arxiv.org/html/2512.12818v1](https://arxiv.org/html/2512.12818v1)  
> 23. MemGraphRAG: Memory-based Multi-Agent System for Graph Retrieval-Augmented Generation \- arXiv, [https://arxiv.org/html/2606.00610v1](https://arxiv.org/html/2606.00610v1)  
> 24. MemGraphRAG: Memory-based Multi-Agent System for Graph Retrieval-Augmented Generation \- ResearchGate, [https://www.researchgate.net/publication/405684557\_MemGraphRAG\_Memory-based\_Multi-Agent\_System\_for\_Graph\_Retrieval-Augmented\_Generation](https://www.researchgate.net/publication/405684557_MemGraphRAG_Memory-based_Multi-Agent_System_for_Graph_Retrieval-Augmented_Generation)  
> 25. MemGraphRAG\_ | PDF | Information Retrieval | Knowledge \- Scribd, [https://www.scribd.com/document/1069328931/MemGraphRAG](https://www.scribd.com/document/1069328931/MemGraphRAG)  
> 26. \[KDD 2026\] MemGraphRAG: Memory-based Multi-Agent System for Graph Retrieval-Augmented Generation \- GitHub, [https://github.com/XMUDeepLIT/MemGraphRAG](https://github.com/XMUDeepLIT/MemGraphRAG)  
> 27. ragflow/AGENTS.md at main \- GitHub, [https://github.com/infiniflow/ragflow/blob/main/AGENTS.md](https://github.com/infiniflow/ragflow/blob/main/AGENTS.md)  
> 28. Understanding Claude Skills vs. Subagents. It's not that confusing : r/ClaudeAI \- Reddit, [https://www.reddit.com/r/ClaudeAI/comments/1obq6wq/understanding\_claude\_skills\_vs\_subagents\_its\_not/](https://www.reddit.com/r/ClaudeAI/comments/1obq6wq/understanding_claude_skills_vs_subagents_its_not/)  
> 29. Claude Opus 5's Gauntlet Loop: AI Game Generation Explained | Stork.AI, [https://www.stork.ai/blog/ai-builds-a-fps-in-one-shot](https://www.stork.ai/blog/ai-builds-a-fps-in-one-shot)  
> 30. The Gauntlet Loop, tested: four runs of Matt Shumer's method \- WotAI, [https://wotai.co/blog/gauntlet-loop-playbook](https://wotai.co/blog/gauntlet-loop-playbook)  
> 31. Matt Pollock mattpollock \- GitHub, [https://github.com/mattpollock](https://github.com/mattpollock)  
> 32. PO and Claude : r/claudeskills \- Reddit, [https://www.reddit.com/r/claudeskills/comments/1un01mn/po\_and\_claude/](https://www.reddit.com/r/claudeskills/comments/1un01mn/po_and_claude/)  
> 33. This Open-Source Tool Solved Scraping The Web (Scrapling) \- Summary \- Video Highlight, [https://videohighlight.com/v/4rKZG2s\_YgU](https://videohighlight.com/v/4rKZG2s_YgU)  
> 34. Prime Agent: Memory That Sticks (Hands-On Guide) | AI Success Lab Blog, [https://aisuccesslabjuliangoldie.com/blog/prime-agent/](https://aisuccesslabjuliangoldie.com/blog/prime-agent/)