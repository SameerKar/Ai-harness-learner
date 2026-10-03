# 📋 Per-Module Research Plans

> **Purpose:** Detailed research plan for each learning module (00-20), including sources, key questions, repos, and deliverables.  
> **Last Updated:** 2026-10-03  
> **Source Channels:** AI Engineer, Alejandro AO, KodeKloud + external repos

---

## How to Use This Document

Each module has:
- **Objective** — What we need to learn
- **Key Questions** — Specific questions to answer
- **Source Videos** — Mapped talks/tutorials from our tracked channels
- **Open-Source Repos** — GitHub repos to study and potentially integrate
- **Search Strategy** — Web search queries for enrichment
- **Deliverables** — What the finished module should contain
- **Dependencies** — What must be done before this module

---

## Module 00 — Foundations ✅ COMPLETE

> Already enriched: `what-is-a-harness.md`, `harness-vs-framework-vs-sdk.md`, `design-principles.md`, `glossary.md`

**Remaining work:** Update glossary with new terms from modules 18-20 (LLM routing, deployment, etc.)

---

## Module 01 — Teardowns

### Objective
Source-level architectural analysis of 10 agent harnesses, producing a normalized comparison matrix.

### Status
- ✅ `hermes-agent.md` — Complete
- ⬜ 9 remaining teardowns

### Key Questions (Q16-Q43 per harness)
- Process architecture, agent loop location, model invocation
- Tool registration, serialization, validation, execution
- Permission checking, context assembly, compaction
- Session storage, event emission, streaming, error propagation
- Subagent spawning, memory storage, extension loading

### Source Videos
| Talk | Harness | Channel |
|------|---------|---------|
| "Codex, Behind the Harness" — Dominik Kundel | Codex | AI Engineer |
| "Anthropic's Applied AI team on Agentic Surfaces" | Claude Code | AI Engineer |
| "The Making of Devin" | Devin (reference) | AI Engineer |
| "RLM: Recursive Language Models for Large Codebases" | Prime Agent | AI Engineer |
| "The 3 Pillars of Autonomy" — Michele Catasta, Replit | Replit Agent | AI Engineer |
| "What if the Harness Mattered More Than the Model" — Etsy | General | AI Engineer |

### Open-Source Repos
| Repo | For Teardown |
|------|-------------|
| `NousResearch/hermes-agent` | ✅ Done |
| `openai/codex` (open-source harness) | codex.md |
| `opencode-ai/opencode` | opencode.md |
| `block/goose` | goose.md |
| `cline/cline` | cline.md |
| `paul-gauthier/aider` | aider.md |
| `deepseek-ai/DeepSeek-V3` (for UI patterns) | deepseek-harness.md |

### Deliverables
- 10 individual teardown files following Example Prompt 1 template
- `comparison-matrix.md` — Normalized capability × harness matrix

---

## Module 02 — Agent Runtime

### Objective
Understand the core agent loop, state machines, event systems, error handling, and streaming patterns used across harnesses.

### Key Questions
- How does the Observe → Think → Act → Observe loop work?
- What state transitions exist? (idle → running → tool_call → awaiting_approval → etc.)
- How are events emitted and consumed?
- How do errors propagate? Retries? Exponential backoff?
- How is streaming handled across different providers?

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "Don't Let the LLM Drive" — Microsoft | State machine-driven agent (Ace) | AI Engineer |
| "The Great Loops Debate" — Panel | Agent loop patterns compared | AI Engineer |
| "Intro to Agents - Create an Agent from Scratch" | Agent loop from zero | Alejandro AO |
| "Python: Create a ReAct Agent from Scratch" | ReAct loop implementation | Alejandro AO |
| "Ship It: Building Production-Ready Agents" | Error handling in prod | AI Engineer |
| "Two Roads to Durable Agents: Replay vs Snapshot" | Durability patterns | AI Engineer |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `vercel/ai` (Vercel AI SDK) | Streaming patterns, provider abstraction |
| `langchain-ai/langgraph` | State machine agent orchestration |
| `mastra-ai/mastra` | TypeScript agent framework with workflows |

### Search Strategy
```
"agent loop state machine design pattern"
"ReAct agent implementation Python"
"event-driven agent architecture"
"agent error handling retry strategy"
"streaming LLM responses SSE WebSocket"
```

### Deliverables
- `agent-loop-design.md` — Core loop patterns with diagrams
- `state-machine-spec.md` — State definitions and transitions
- `event-architecture.md` — Event bus design
- `error-handling-retries.md` — Error propagation and recovery
- `streaming-patterns.md` — Provider-specific streaming

---

## Module 03 — Context Engineering

### Objective
Master prompt architecture, context assembly, caching strategies, compaction algorithms, and token budgeting.

### Key Questions
- How is context assembled per turn? (system prompt + tools + history + memory + user input)
- How does prompt caching differ by provider? (Anthropic prefix caching vs OpenAI)
- When and how is context compacted?
- What is token budgeting and how do different harnesses allocate tokens?

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "Agentic Search for Context Engineering" — Elastic | Context retrieval strategies | AI Engineer |
| "Stop Babysitting Your Agents: Building a Context Engine" | Mergeable code context | AI Engineer |
| "We Cut 94% of AI Coding Tokens with a Local Code Index" | Token optimization | AI Engineer |
| "The Unreasonable Effectiveness of Prompt Learning" | Prompt techniques | AI Engineer |
| "Create a RAG Chain using LangChain 0.1" | RAG chain patterns | Alejandro AO |
| "Advanced RAG with LlamaIndex" | Metadata extraction, indexing | Alejandro AO |
| "Agentic RAG, Open LLMs, FREE Embeddings" | Modern agentic RAG | Alejandro AO |
| "RAG Agents in Prod: 10 Lessons" — Douwe Kiela | Production RAG | AI Engineer |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `run-llama/llama_index` | Advanced RAG, metadata extraction |
| `langchain-ai/langchain` | RAG chains, history-aware retrievers |
| `chroma-core/chroma` | Vector store for embeddings |
| `qdrant/qdrant` | Production vector database |

### Deliverables
- `prompt-architecture.md` — Layered prompt design patterns
- `context-assembly-engine.md` — Per-turn context construction
- `prompt-caching-strategies.md` — Provider-specific caching
- `compaction-algorithms.md` — Threadshift, summarization, etc.
- `token-budgeting.md` — Allocation strategies

---

## Module 04 — Tools System

### Objective
Understand tool contracts, MCP protocol, tool routing, and the native vs plugin vs MCP spectrum.

### Key Questions
- What does a tool JSON schema look like across harnesses?
- How does MCP actually work? (transport, capabilities, lifecycle)
- How are tools routed to the right provider/backend?
- When to use native tools vs MCP vs plugins?

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "Full Spec MCP: Hidden Capabilities" — Harald Kirschner | Deep MCP spec | AI Engineer |
| "The Rise of the Agentic Economy on Shoulders of MCP" | MCP ecosystem | AI Engineer |
| "Build an AI Agent That Searches Docs + Web" | Tool selection patterns | Alejandro AO |
| "MCP Explained Simply" | MCP foundations | KodeKloud |
| "Don't Build Agents, Build Skills Instead" — Anthropic | Skills vs tools | AI Engineer |
| "Skills Are the New SDKs" | Skill architecture | AI Engineer |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `modelcontextprotocol/specification` | Official MCP spec |
| `modelcontextprotocol/servers` | Reference MCP server implementations |
| `anthropics/claude-code` | Skills system, tool registration |

### Deliverables
- `tool-contract-spec.md`, `tool-metadata-schema.md`, `mcp-deep-dive.md`, `tool-routing.md`, `native-vs-plugin-vs-mcp.md`

---

## Module 05 — Security

### Objective
Design permission models, sandbox tiers, threat models, and approval UX for AI agents.

### Key Questions
- What threats do agents introduce? (injection, traversal, exfiltration, privilege escalation)
- How to sandbox agent tool execution? (Docker, MicroVM, WebAssembly)
- How to implement approval workflows for dangerous operations?

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "Safety and Security for Code Executing Agents" | Agent security patterns | AI Engineer |
| "Why and How You Need to Sandbox AI-Generated Code" — Cloudflare | Sandboxing | AI Engineer |
| "We Gave an Agent Production Code Access" | Production security stories | AI Engineer |
| "Building AI Agents That Manage Kubernetes" | Guardrails, human-in-the-loop | KodeKloud |
| "The AI Bugpocalypse Is Here. Now What?" | Security implications | AI Engineer |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `harbor-framework/harbor` | Agent guardrails, compliance, observability |
| `e2b-dev/e2b` | Secure sandboxed execution environments |
| `cloudflare/workers` | Edge-based sandboxing |

---

## Module 06 — Memory Systems

### Objective
Master memory classes, storage backends, retrieval strategies, conflict resolution, and pluggable memory interfaces.

### Key Questions (Q206-Q223)
- When is memory written? Who decides what to memorize?
- How is stale/contradictory memory handled?
- How is memory scoped? (session, project, user, org)
- How are memories retrieved? (vector, graph, temporal, fact-based)
- How do memories survive compaction and session changes?

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "Stop Using RAG As Memory" | Memory vs RAG distinction | AI Engineer |
| "Turn 10,994 Notes Into Your Agent's Memory" | Note-to-memory pipeline | AI Engineer |
| "Stateful Agents: Full Workshop with Letta/MemGPT" | Stateful agent memory | AI Engineer |
| "A Genius With Amnesia" — Polygraph | Cross-session memory | AI Engineer |
| "Agentic GraphRAG: AI's Logical Edge" | Graph-based memory | AI Engineer |
| "The Knowledge Graph Mullet" | GraphRAG patterns | AI Engineer |
| "LangChain Memory Tutorial" | Memory types in LangChain | Alejandro AO |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `cpacker/MemGPT` (Letta) | Stateful agents, memory management |
| `getzep/zep` | Long-term memory for agents |
| `mem0ai/mem0` | Personalized AI memory layer |
| `graphiti-ai/graphiti` | Temporal knowledge graphs |
| `neo4j/neo4j` | Graph database for knowledge graphs |
| `lfnovo/open-notebook` | Open-source NotebookLM alternative |

---

## Module 07 — Sessions

### Objective
Design session models (tree, branch, fork), storage backends, lifecycle management, and cross-session memory.

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "Two Roads to Durable Agents: Replay vs Snapshot" | Session durability | AI Engineer |
| "Scaling to Long Horizons" | Long-running session management | AI Engineer |

---

## Module 08 — Subagents & Orchestration

### Objective
Master multi-agent orchestration, delegation patterns, A2A protocols, and budget management.

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "The Missing Primitive for Agent Swarms" | Swarm coordination | AI Engineer |
| "ALPHALAB: Autonomous Multi-Agent Research" — Morgan Stanley | Multi-agent harness | AI Engineer |
| "kagent Explained: Orchestrating AI Agent Crew in K8s" | K8s agent orchestration | KodeKloud |
| "Create an Open Deep Research Multi-Agent in Python" | Multi-agent build | Alejandro AO |
| "Agents Building Agents" | Meta-agent patterns | AI Engineer |
| "Building & Scaling an AI Agent Swarm" — Deepgram | Voice agent swarms | AI Engineer |
| "Using Agents to Build an Agent Company" | Agent-of-agents | AI Engineer |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `langchain-ai/langgraph` | Multi-agent workflows |
| `microsoft/autogen` | Multi-agent conversation framework |
| `crewAI/crewAI` | Agent crew orchestration |
| `google/A2A` | Agent-to-Agent protocol specification |

---

## Module 09 — Extensions SDK

### Source Videos
| Talk | Topic |
|------|-------|
| "Don't Build Agents, Build Skills Instead" — Anthropic | Skills architecture |
| "Skills Are the New SDKs" | Skill packaging |
| "We Vetted 2,000 AI Skills Before They Reached Developers" | Skill quality |
| "Skills at Scale" | Enterprise skill management |
| "Replacing 12K LOC with a 200 LOC Skill" | Skill efficiency |

---

## Module 10 — Providers & Model Abstraction

### Source Videos
| Talk | Topic |
|------|-------|
| "AI Engineering 201: Inference" — Charles Frye | Provider comparison |
| "Azure AI Model Catalog" | Model catalog patterns |
| "Sovereign Escape Velocity" — Google DeepMind | Open models |
| "WTF Do People Use Open Models For?" | Open model use cases |
| "The Base Model Is Dead" | Model selection evolution |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `BerriAI/litellm` | Unified LLM API gateway (100+ models) |
| `ollama/ollama` | Local model inference |
| `vllm-project/vllm` | High-throughput inference |

---

## Module 11 — Observability

### Source Videos
| Talk | Topic |
|------|-------|
| "Your Agent Failed in Prod. Good Luck Reproducing It" | Debugging agents |
| "Conquering Agent Chaos" | Agent observability |
| "Agents Need Feature Flags" | Production safeguards |
| "kagent + OpenTelemetry Tracing" | K8s agent observability | 

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `harbor-framework/harbor` | Agent guardrails, compliance, tracing |
| `langfuse/langfuse` | Open-source LLM observability |
| `helicone-ai/helicone` | LLM analytics and monitoring |
| `braintrustdata/braintrust` | Eval-driven AI development |
| `open-telemetry/opentelemetry` | Distributed tracing standard |

---

## Module 12 — UI (TUI & GUI)

### Source Videos
| Talk | Topic |
|------|-------|
| "ChatGPT is Poorly Designed. So I Fixed It" | UI/UX for AI agents |
| "Vibe Engineering: Effect Apps" | Modern AI app design |
| "The 4 Patterns of AI-Native Development" | AI-native UI patterns |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `DavidHDev/react-bits` | Modern React design patterns |
| `ink/ink` | React for CLI (TUI framework) |
| `Textualize/textual` | Python TUI framework |
| `charmbracelet/bubbletea` | Go TUI framework |

---

## Module 13-17 — Config, Open-Source Tools, Evaluation, Blueprints, Specs

> These modules depend on completion of 01-12. Research plans follow the same template structure.
> Key addition: Module 14 (Open-Source Tools) should incorporate ALL repos listed in the module-specific plans above.

---

## Module 18 — ⭐ LLM Routing & Model Selection

### Objective
Build a comprehensive model catalog, routing strategies, capability matrix, cost optimization, and multimodal routing guide.

### Key Questions
- Which model for coding? (Claude Sonnet, GPT-4o, DeepSeek-Coder, Codestral, Qwen)
- Which model for vision? (GPT-4o, Claude, Gemini Pro Vision, Qwen-VL)
- Which model for audio? (Whisper, Gemini, DeepGram)
- Which model for deep research? (Claude Opus, o1, Gemini 2.5 Pro)
- Which model for embeddings? (text-embedding-3-large, Cohere, BGE, Jina)
- Which model for judging/evaluation? (LLM-as-judge patterns)
- How to route at runtime? (LiteLLM, OpenRouter, custom router)
- How to optimize cost while maintaining quality? (cascade patterns)
- When to fine-tune vs prompt-engineer? (LoRA, QLoRA, full fine-tuning)

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "AI Engineering 201: Inference" — Charles Frye | Model deployment, open vs proprietary | AI Engineer |
| "Azure AI Model Catalog" | Model catalog design | AI Engineer |
| "The Base Model Is Dead" | Post-training, fine-tuning era | AI Engineer |
| "WTF Do People Use Open Models For?" | Open model use cases | AI Engineer |
| "Sovereign Escape Velocity" — Google DeepMind | Open models at scale | AI Engineer |
| "Text Diffusion" — Google DeepMind | Novel model architectures | AI Engineer |
| "The Future of Qwen" | Generalist agent model | AI Engineer |
| "Data and Environment Curation for Post-training LLMs" | Synthetic data, fine-tuning | AI Engineer |
| "ChatGPT is Poorly Designed. So I Fixed It" | Heuristic model routing | AI Engineer |
| "Databricks Agent Engineering" | Enterprise model selection | YouTube (user ref) |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `BerriAI/litellm` | Unified API for 100+ models, cost tracking, routing |
| `ollama/ollama` | Local model inference, model management |
| `vllm-project/vllm` | High-throughput serving, PagedAttention |
| `huggingface/transformers` | Model zoo, fine-tuning pipeline |
| `unslothai/unsloth` | Fast LoRA/QLoRA fine-tuning |
| `lm-sys/FastChat` | Model serving, Chatbot Arena benchmarks |
| `NVIDIA/TensorRT-LLM` | Optimized inference |

### Search Strategy
```
"LLM model comparison 2025 2026 benchmark"
"model routing AI agent cost optimization"
"LiteLLM vs OpenRouter comparison"
"embedding model comparison RAG 2025"
"fine-tuning LoRA QLoRA guide practical"
"multimodal model routing vision audio code"
"LLM-as-judge evaluation pattern"
"open weight models Llama Qwen DeepSeek Gemma comparison"
```

### Deliverables
- 10 files in `18-llm-routing-and-models/` (see folder architecture)

---

## Module 19 — ⭐ Tech Stack & Deployment

### Objective
Learn everything needed to deploy AI agents at scale: infrastructure, CI/CD, cloud, security, observability, compliance, and client pitching.

### Key Questions
- How to containerize and deploy an AI agent? (Docker → K8s)
- How to set up CI/CD for AI applications? (prompt versioning, A/B testing)
- Which cloud platform for which workload? (GPU scheduling, cost)
- How to monitor agents in production? (Harbor, Langfuse, Helicone)
- How to handle compliance for AI systems? (SOC2, HIPAA, GDPR)
- How to build voice/real-time agents? (Pipecat vs LiveKit)
- How to pitch AI agent projects to clients?

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "Conquering Agent Chaos" — Agentuity | Long-running agent deployment | AI Engineer |
| "Under 5 Minutes to a Deployed LLM Endpoint" — RunPod | Quick deployment | AI Engineer |
| "Ship It: Building Production-Ready Agents" | Production patterns | AI Engineer |
| "The DevOps Engineer Who Never Sleeps" | AI in DevOps | AI Engineer |
| "Velocity Sickness" | Scaling teams with AI | AI Engineer |
| "What We Learned Deploying AI Within Bloomberg" | Enterprise deployment | AI Engineer |
| "Building & Scaling an AI Agent Swarm" — Deepgram | Voice agent scaling | AI Engineer |
| "Debug Kubernetes with kagent" | K8s agent management | KodeKloud |
| "Building AI Agents That Manage K8s" | K8s + agent integration | KodeKloud |
| "kagent Explained" | K8s CRD model, OpenTelemetry | KodeKloud |
| "AI-Powered DevOps Crash Course" | CI/CD for AI | KodeKloud |
| "KAgent: Host AI Agents on Kubernetes" | Full K8s deployment | KodeKloud |

### Open-Source Repos
| Repo | What to Study |
|------|--------------|
| `harbor-framework/harbor` | Agent observability, guardrails, compliance |
| `pipecat-ai/pipecat` | Voice AI framework (extensible) |
| `livekit/livekit` | Real-time communication |
| `e2b-dev/e2b` | Sandboxed code execution |
| `modal-labs/modal` | Serverless GPU compute |
| `langfuse/langfuse` | LLM observability |
| `helicone-ai/helicone` | API analytics |
| `portkey-ai/gateway` | AI gateway |
| `kubernetes/kubernetes` | Container orchestration |

### Deliverables
- 12 files in `19-tech-stack-and-deployment/` (see folder architecture)

---

## Module 20 — ⭐ Real-World Projects & Open-Source Encyclopedia

### Objective
Build a catalog of end-to-end project patterns, open-source tools/repos, and learning resources that can be directly applied to our PROJECTS.

### Key Questions
- What are the common patterns across successful AI agent projects?
- Which open-source tools solve which problems?
- How do enterprise teams (Databricks, Morgan Stanley, Etsy, Lyft) build agents?
- What are the best system designs for different project types?

### Source Videos
| Talk | Topic | Channel |
|------|-------|---------|
| "RAG Agents in Prod: 10 Lessons" — Douwe Kiela | Production RAG | AI Engineer |
| "ALPHALAB" — Morgan Stanley | Multi-agent research | AI Engineer |
| "Agents in Production: OpenGov" | Government AI agent | AI Engineer |
| "Build Evals That Actually Matter" — Lyft | Production evaluation | AI Engineer |
| "Build an AI Agent from Scratch" | Tutorial build | Alejandro AO |
| "Agentic RAG with n8n" | Workflow automation | Alejandro AO |
| "Multimodal RAG" | Advanced RAG | Alejandro AO |
| [RAG Application E2E](https://www.youtube.com/watch?v=bjkjaqUZl4E) | Full RAG build | User ref |
| [Production RAG](https://www.youtube.com/watch?v=UhILMAhpxFQ) | Production patterns | User ref |
| [Databricks Agent](https://www.youtube.com/watch?v=ObTPqBGsEbA) | Enterprise agent | User ref |

### Open-Source Repos (Encyclopedia Candidates)
| Category | Repos |
|----------|-------|
| **Agent Frameworks** | LangGraph, CrewAI, AutoGen, Mastra, Letta/MemGPT |
| **RAG & Knowledge** | LlamaIndex, LangChain, Chroma, Qdrant, LanceDB |
| **Memory** | Zep, Mem0, Graphiti |
| **UI/Design** | react-bits, Grphify |
| **Knowledge Mgmt** | open-notebook (NotebookLM alternative) |
| **Voice/Real-time** | Pipecat, LiveKit, Deepgram |
| **Observability** | Harbor, Langfuse, Helicone |
| **Deployment** | e2b, Modal, RunPod |
| **Model Serving** | LiteLLM, Ollama, vLLM, TensorRT-LLM |
| **Fine-tuning** | Unsloth, HuggingFace PEFT |
| **Research** | Karpathy auto-research, System-1 open alternatives |

### Deliverables
- `rag-applications.md` — RAG patterns catalog
- `agent-systems.md` — Agent architecture case studies
- `voice-audio-agents.md` — Voice agent implementations
- `multi-agent-systems.md` — Multi-agent orchestration patterns
- `open-source-encyclopedia.md` — Master catalog of repos with comparison tables

---

## Research Execution Priority Order

```
Priority 1 (Do Now):
  Module 18 F1-F4  → Model catalog, routing, capability matrix, cost optimization
  Module 01 A5     → Codex teardown (open-source, well-documented)
  Module 20 H5     → Start open-source encyclopedia

Priority 2 (Do Next):
  Module 02 B1-B2  → Agent loop, event architecture
  Module 03 B3     → Context engineering (heavily informed by Alejandro AO tutorials)
  Module 06 C1     → Memory systems (rich source material available)
  Module 19 G1,G6  → Deployment strategies, Harbor/Langfuse

Priority 3 (After Core):
  Module 04 B4     → Tools & MCP
  Module 05 B5     → Security
  Module 08 C3     → Subagents & orchestration
  Module 01 A6     → Remaining teardowns

Priority 4 (Later):
  Modules 07, 09-15 → Sessions, extensions, providers, observability, UI, config, evaluation
  Module 16-17      → Blueprints and specs (synthesis of all above)
  Module 19 G7-G9   → AI SDLC, compliance, voice
```
