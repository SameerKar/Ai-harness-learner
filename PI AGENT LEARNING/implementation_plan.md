# PI Agent Harness — Master Learning & Research Plan

> **Goal:** Learn everything needed to build commercial-grade, specialized AI agent harnesses (coding, media, research, personal) — then build them.  
> **Last Updated:** 2026-10-03  
> **Workspace:** `e:\ZEN'S WEAR\Harness Learning\`

---

## Folder Architecture

### 🏠 Root Workspace: `e:\ZEN'S WEAR\Harness Learning\`

```
Harness Learning\                     ← Workspace root
│
├── PI AGENT LEARNING\                ← Learning & research environment
├── PROJECTS\                         ← Real-life project implementations
├── tools and skills\                 ← Reusable tools & skills for any project
│   ├── MEGA_SKILLS.md                ← Master index of all tools & skills
│   ├── tools/                        ← Python scripts, CLI tools, utilities
│   │   ├── video_subtitle_harvester/ ← Extract subtitles from YouTube (yt-dlp)
│   │   ├── csv_query_search/         ← Search/filter/query CSV data files
│   │   └── youtube_channel_extractor/← Extract all video links from a channel
│   └── skills/                       ← Agent-readable skill files (SKILL.md)
└── .agents/                          ← Agent configuration
```

### 📚 Learning Environment: `PI AGENT LEARNING\`

```
PI AGENT LEARNING\                    ← Learning & research
│
├── README.md                         ← Project overview & navigation index
├── implementation_plan.md            ← ✅ THIS FILE — master plan & task list
├── SKILL.md                          ← Research agent instruction set
│
├── extra-references\                 ← 📁 Archive of earlier research docs
│   ├── README.md                     ← What each file contains & when to use
│   ├── questions.md                  ← 300+ research questions (20 phases)
│   ├── Research1.md                  ← Architecture deep-dive (5-subsystem model)
│   ├── Research2.md                  ← 7-harness comparative teardown
│   └── suggestions.md               ← Status audit & gap analysis
│
├── 00-foundations\                   ← Phase 0: Core concepts & definitions
│   ├── what-is-a-harness.md          ← ✅ Written
│   ├── harness-vs-framework-vs-sdk.md← ✅ Written
│   ├── design-principles.md          ← ✅ Written
│   └── glossary.md                   ← ✅ Written
│
├── 01-teardowns\                     ← Phase 1: Existing harness analysis
│   ├── pi-agent.md
│   ├── claude-code.md
│   ├── codex.md
│   ├── hermes-agent.md               ← ✅ Researched
│   ├── opencode.md
│   ├── goose.md
│   ├── cline.md
│   ├── deepseek-harness.md
│   ├── prime-agent.md
│   ├── aider.md
│   └── comparison-matrix.md          ← Normalized capability × harness matrix
│
├── 02-agent-runtime\                 ← Phase 2: Core loop & event system
│   ├── agent-loop-design.md
│   ├── state-machine-spec.md
│   ├── event-architecture.md
│   ├── error-handling-retries.md
│   └── streaming-patterns.md
│
├── 03-context-engineering\           ← Phase 3: Prompts, caching, assembly
│   ├── prompt-architecture.md        ← Layered prompt design
│   ├── context-assembly-engine.md    ← How context is built per turn
│   ├── prompt-caching-strategies.md  ← Provider-specific caching
│   ├── compaction-algorithms.md      ← Threadshift, auto-summary, etc.
│   └── token-budgeting.md
│
├── 04-tools-system\                  ← Phase 4: Tool contracts & MCP
│   ├── tool-contract-spec.md
│   ├── tool-metadata-schema.md       ← risk, side_effects, permissions
│   ├── mcp-deep-dive.md
│   ├── tool-routing.md
│   ├── native-vs-plugin-vs-mcp.md
│   └── video_harvester\              ← Working tool (also copied to tools/)
│
├── 05-security\                      ← Phase 5: Permissions & sandboxing
│   ├── permission-model.md
│   ├── sandbox-tiers.md
│   ├── threat-model.md
│   ├── policy-engine-design.md
│   └── approval-ux-patterns.md
│
├── 06-memory-systems\                ← Phase 6: Persistent memory
│   ├── memory-classes.md
│   ├── mnemosyne-analysis.md
│   ├── hindsight-tempr-cara.md
│   ├── memgraphrag.md
│   ├── memory-interface-design.md
│   └── memory-provider-comparison.md
│
├── 07-sessions\                      ← Phase 7: Session architecture
│   ├── session-model.md
│   ├── session-storage.md
│   ├── session-lifecycle.md
│   └── cross-session-memory.md
│
├── 08-subagents\                     ← Phase 8: Orchestration
│   ├── subagent-architecture.md
│   ├── gauntlet-loop.md
│   ├── delegation-patterns.md
│   ├── a2a-protocols.md
│   └── budget-management.md
│
├── 09-extensions-sdk\                ← Phase 9: Plugin ecosystem
│   ├── extension-taxonomy.md
│   ├── extension-sdk-design.md
│   ├── skill-registry.md
│   ├── progressive-disclosure.md
│   └── marketplace-design.md
│
├── 10-providers\                     ← Phase 10: Model abstraction
│   ├── provider-abstraction.md
│   ├── capability-detection.md
│   ├── model-routing.md
│   └── local-inference.md
│
├── 11-observability\                 ← Phase 11: Telemetry & tracing
│   ├── event-schema.md
│   ├── trace-model.md
│   ├── cost-tracking.md
│   ├── flight-recorder.md
│   └── telemetry-plugins.md
│
├── 12-ui\                            ← Phase 12: TUI & GUI
│   ├── tui-architecture.md
│   ├── tui-frameworks.md
│   ├── gui-api-layer.md
│   ├── dashboard-wireframes.md
│   ├── configuration-editing.md
│   └── steering-patterns.md
│
├── 13-config\                        ← Phase 13: Configuration system
│   ├── config-hierarchy.md
│   ├── config-schema.md
│   ├── hot-reload.md
│   └── agent-proposed-diffs.md
│
├── 14-open-source-tools\             ← Phase 14: Ecosystem & libraries
│   ├── browser-tools.md
│   ├── scraping-tools.md
│   ├── knowledge-tools.md
│   ├── media-tools.md
│   ├── coding-tools.md
│   └── licensing-matrix.md
│
├── 15-evaluation\                    ← Phase 15: Benchmarking
│   ├── benchmark-suite-design.md
│   ├── task-categories.md
│   ├── metrics.md
│   └── evaluation-harness.md
│
├── 16-product-blueprints\            ← Phase 16: Specialized harnesses
│   ├── coding-harness.md
│   ├── media-harness.md
│   ├── research-harness.md
│   ├── personal-harness.md
│   └── multi-agent-harness.md
│
├── 17-reference-specs\               ← Final deliverable specs
│   ├── harness-kernel-spec.md
│   ├── security-spec.md
│   ├── context-memory-spec.md
│   ├── extension-sdk-spec.md
│   ├── observability-spec.md
│   └── implementation-roadmap.md
│
├── 18-llm-routing-and-models\        ← ⭐ NEW Phase 18: LLM Routing & Model Selection
│   ├── model-catalog.md              ← All models, capabilities, pricing
│   ├── routing-strategies.md         ← Rules, classifiers, LLM-as-judge
│   ├── capability-matrix.md          ← Vision/audio/code/reasoning per model
│   ├── cost-optimization.md          ← Cascade patterns, cheap vs expensive
│   ├── fallback-chains.md            ← Retry logic, provider failover
│   ├── fine-tuning-and-lora.md       ← LoRA, QLoRA, when to fine-tune
│   ├── embedding-models.md           ← BGE, text-embedding-3, Cohere
│   ├── open-weight-models.md         ← Llama, Qwen, DeepSeek, Gemma
│   ├── benchmarks-and-comparisons.md ← MMLU, HumanEval, coding benchmarks
│   └── multimodal-routing.md         ← Vision + audio + code composition
│
├── 19-tech-stack-and-deployment\     ← ⭐ NEW Phase 19: Production & Deployment
│   ├── deployment-strategies.md      ← Cloud/edge/hybrid, containerization
│   ├── ci-cd-pipelines.md            ← Testing agents, versioning prompts
│   ├── cloud-platforms.md            ← AWS, GCP, Azure, Vercel comparison
│   ├── kubernetes-for-agents.md      ← K8s, GPU scheduling, autoscaling
│   ├── security-in-production.md     ← API keys, rate limiting, filtering
│   ├── observability-at-scale.md     ← Harbor, Langfuse, Helicone, Datadog
│   ├── load-balancing.md             ← Provider routing, queueing
│   ├── ai-sdlc.md                    ← New SDLC for AI-native products
│   ├── client-pitching.md            ← ROI, demos, scope for clients
│   ├── compliance-and-governance.md  ← SOC2, HIPAA, GDPR
│   ├── cost-management.md            ← API cost management at scale
│   └── voice-and-realtime.md         ← Pipecat, LiveKit, WebRTC
│
├── 20-real-world-projects\           ← ⭐ NEW Phase 20: End-to-End Project Patterns
│   ├── README.md                     ← Project categories & sources index
│   ├── rag-applications.md           ← RAG patterns from real tutorials
│   ├── agent-systems.md              ← Agent system architectures
│   ├── voice-audio-agents.md         ← Voice agent implementations
│   ├── multi-agent-systems.md        ← Multi-agent orchestration
│   └── open-source-encyclopedia.md   ← Catalog of open-source tools & repos
│
├── Youtube and Learning matarials\   ← Raw data from YouTube channels
│   └── AI engineerinng Youtube Channel\
│       ├── aie-talks.csv             ← ~300+ talks with summaries
│       ├── aie-speakers.csv          ← Speaker profiles & affiliations
│       ├── aie-topics.csv            ← Topic taxonomy
│       ├── aie-chapters.csv          ← Timestamped chapters per talk
│       ├── aie-organizations.csv     ← Organizations in the ecosystem
│       └── aie-transcripts.csv       ← Transcript download links
│
├── notes\                            ← Running learning notes
│   ├── insights.md
│   ├── gotchas.md
│   ├── open-questions.md
│   └── bookmarks.md
│
├── scratch\                          ← Experiments & prototypes
│   ├── mini-loop\
│   ├── tool-contract\
│   └── tui-prototype\
│
├── index.html                        ← Dashboard UI (Learning Hub)
└── build-ui.js                       ← Dashboard builder script
```

### 🏗️ Projects Directory: `PROJECTS\`

```
PROJECTS\                             ← Real-life implementations
├── RAG Harness\                      ← RAG-based agent project
├── VOICE RAG AGENT\                  ← Voice + RAG agent
├── Social Media Manager-Analyzer\    ← Social media AI tool
├── Real Estate VR CARD\              ← VR-based real estate
└── zenswear-harness\                 ← Full harness implementation
```

---

## Research Execution Plan

### Track A — Foundations (Phases 0-1)

| Step | What | Input | Output | Priority |
|------|-------|-------|--------|----------|
| A1 | Define what a harness IS | Research1 + questions P0 Q1-15 | `00-foundations/` complete | P0 |
| A2 | Teardown Pi Agent | Pi repo, docs, extensions | `01-teardowns/pi-agent.md` | P0 |
| A3 | Teardown Claude Code | Plugin repo, docs site | `01-teardowns/claude-code.md` | P0 |
| A4 | Teardown Hermes Agent | Full repo, memory docs | `01-teardowns/hermes-agent.md` | P0 |
| A5 | Teardown remaining 4+ | Codex, OpenCode, Goose, Cline | Individual teardown files | P0 |
| A6 | Teardown innovators | DeepSeek, Prime Agent, Aider | Individual teardown files | P1 |
| A7 | Build comparison matrix | All teardowns | `01-teardowns/comparison-matrix.md` | P0 |

### Track B — Core Architecture (Phases 2-5)

| Step | What | Output | Priority |
|------|-------|--------|----------|
| B1 | Agent loop & state machine | `02-agent-runtime/` complete | P0 |
| B2 | Event architecture | `02-agent-runtime/event-architecture.md` | P0 |
| B3 | Context assembly & caching | `03-context-engineering/` complete | P0 |
| B4 | Tool contracts & MCP | `04-tools-system/` complete | P0 |
| B5 | Security & sandboxing | `05-security/` complete | P0 |

### Track C — Intelligence Layer (Phases 6-8)

| Step | What | Output | Priority |
|------|-------|--------|----------|
| C1 | Memory system research | `06-memory-systems/` complete | P0 |
| C2 | Session architecture | `07-sessions/` complete | P0 |
| C3 | Subagent & Gauntlet Loop | `08-subagents/` complete | P0 |

### Track D — Ecosystem (Phases 9-14)

| Step | What | Output | Priority |
|------|-------|--------|----------|
| D1 | Extension SDK design | `09-extensions-sdk/` complete | P0 |
| D2 | Provider abstraction | `10-providers/` complete | P0 |
| D3 | Observability & tracing | `11-observability/` complete | P1 |
| D4 | TUI/GUI architecture | `12-ui/` complete | P1 |
| D5 | Config system | `13-config/` complete | P1 |
| D6 | Open-source tools survey | `14-open-source-tools/` complete | P1 |

### Track E — Production (Phases 15-17)

| Step | What | Output | Priority |
|------|-------|--------|----------|
| E1 | Benchmark suite | `15-evaluation/` complete | P1 |
| E2 | Product blueprints | `16-product-blueprints/` complete | P1 |
| E3 | Final specifications | `17-reference-specs/` complete | P0 |

### Track F — ⭐ LLM Routing & Model Intelligence (Phase 18)

| Step | What | Output | Priority |
|------|-------|--------|----------|
| F1 | Build model catalog | `18-llm-routing-and-models/model-catalog.md` | P0 |
| F2 | Routing strategies research | `18-llm-routing-and-models/routing-strategies.md` | P0 |
| F3 | Capability matrix (vision/audio/code/reasoning) | `18-llm-routing-and-models/capability-matrix.md` | P0 |
| F4 | Cost optimization patterns | `18-llm-routing-and-models/cost-optimization.md` | P0 |
| F5 | Fallback chains & retry logic | `18-llm-routing-and-models/fallback-chains.md` | P1 |
| F6 | Fine-tuning & LoRA guide | `18-llm-routing-and-models/fine-tuning-and-lora.md` | P1 |
| F7 | Embedding models comparison | `18-llm-routing-and-models/embedding-models.md` | P0 |
| F8 | Open-weight models survey | `18-llm-routing-and-models/open-weight-models.md` | P1 |
| F9 | Benchmark interpretation guide | `18-llm-routing-and-models/benchmarks-and-comparisons.md` | P1 |
| F10 | Multimodal routing design | `18-llm-routing-and-models/multimodal-routing.md` | P0 |

### Track G — ⭐ Tech Stack & Deployment (Phase 19)

| Step | What | Output | Priority |
|------|-------|--------|----------|
| G1 | Deployment strategies | `19-tech-stack-and-deployment/deployment-strategies.md` | P0 |
| G2 | CI/CD for AI apps | `19-tech-stack-and-deployment/ci-cd-pipelines.md` | P1 |
| G3 | Cloud platform comparison | `19-tech-stack-and-deployment/cloud-platforms.md` | P1 |
| G4 | K8s for agent workloads | `19-tech-stack-and-deployment/kubernetes-for-agents.md` | P1 |
| G5 | Production security | `19-tech-stack-and-deployment/security-in-production.md` | P0 |
| G6 | Observability at scale (Harbor, Langfuse) | `19-tech-stack-and-deployment/observability-at-scale.md` | P0 |
| G7 | AI SDLC & client pitching | `19-tech-stack-and-deployment/ai-sdlc.md` + `client-pitching.md` | P1 |
| G8 | Compliance & governance | `19-tech-stack-and-deployment/compliance-and-governance.md` | P1 |
| G9 | Voice & real-time (Pipecat, LiveKit) | `19-tech-stack-and-deployment/voice-and-realtime.md` | P1 |

### Track H — ⭐ Data Pipeline & Real-World Projects (Phase 20)

| Step | What | Output | Priority |
|------|-------|--------|----------|
| H1 | YouTube channel links extraction | New channel links added to `Youtube and Learning matarials/` | P0 |
| H2 | Subtitle/transcript extraction pipeline | Transcripts stored via `video_subtitle_harvester` tool | P0 |
| H3 | CSV data analysis & search tools | `csv_query_search` tool working | ✅ Done |
| H4 | RAG application patterns research | `20-real-world-projects/rag-applications.md` | P1 |
| H5 | Open-source encyclopedia build | `20-real-world-projects/open-source-encyclopedia.md` | P1 |
| H6 | End-to-end project case studies | `20-real-world-projects/agent-systems.md` | P1 |

---

## YouTube & Learning Data Pipeline

### Available Data (AI Engineer Channel)

| File | Rows | Contents |
|------|------|----------|
| `aie-talks.csv` | ~300+ | Talk slug, title, URL, videoId, event, speakers, topics, summary |
| `aie-speakers.csv` | ~200+ | Speaker name, org, job title, affiliated talks |
| `aie-topics.csv` | ~150+ | Topic slugs and names (taxonomy) |
| `aie-chapters.csv` | ~5000+ | Timestamped chapters per talk |
| `aie-organizations.csv` | ~100+ | Organizations represented |
| `aie-transcripts.csv` | ~300+ | JSON/CSV download URLs for transcripts |

### Data Pipeline Workflow

```
YouTube Channels → video_subtitle_harvester → raw transcripts
                                             ↓
raw transcripts → csv_query_search → filtered results
                                    ↓
filtered results → learning modules (enrichment)
                                    ↓
(future) → RAG local indexer → embedded vectors → queryable knowledge base
```

### YouTube Channels to Add (User Will Provide)

| Channel | Focus Area | Status |
|---------|------------|--------|
| AI Engineer (ai.engineer) | Agent engineering, harnesses, deployment | ✅ CSVs extracted |
| [Alejandro AO](https://www.youtube.com/@alejandro_ao) | RAG, agents from scratch, LangChain, memory | ✅ Added — key videos identified |
| [KodeKloud](https://www.youtube.com/@KodeKloud) | K8s agent deployment, MCP, DevOps for AI | ✅ Added — agent videos identified |
| (user to provide more) | Additional channels as needed | ⬜ Pending |

> **Full channel details & video mappings:** See [`Youtube and Learning matarials/channels_index.md`](Youtube%20and%20Learning%20matarials/channels_index.md)  
> **Per-module research plans with source videos:** See [`research_plans.md`](research_plans.md)

### Reference Videos Already Identified

| Video | Topic | Source |
|-------|-------|--------|
| [RAG Application E2E](https://www.youtube.com/watch?v=bjkjaqUZl4E) | RAG application build | YouTube |
| [Production RAG](https://www.youtube.com/watch?v=UhILMAhpxFQ) | Sophisticated production RAG | YouTube |
| [Databricks Agent](https://www.youtube.com/watch?v=ObTPqBGsEbA) | Enterprise agent engineering | YouTube |
| [Intro to Agents from Scratch](https://www.youtube.com/watch?v=Fj2F1vH6p04) | Agent loop, no frameworks | Alejandro AO |
| [LangChain Memory Tutorial](https://www.youtube.com/watch?v=kYyv1J-s5rE) | Memory types in LangChain | Alejandro AO |
| [ReAct Agent from Scratch](https://www.youtube.com/watch?v=wX-y8T_p-Q0) | ReAct framework implementation | Alejandro AO |
| [Multi-Agent Deep Research](https://www.youtube.com/watch?v=6lO-Q7K-JgY) | Multi-agent systems | Alejandro AO |
| [Agentic RAG + Open LLMs](https://www.youtube.com/watch?v=vVjV-7O7sLg) | Agentic RAG with n8n | Alejandro AO |

### Open Source Repos to Track

| Repo | Category | Purpose |
|------|----------|---------|
| [Harbor Framework](https://github.com/harbor-framework/harbor) | Observability/Compliance | Agent guardrails, monitoring |
| [react-bits](https://github.com/DavidHDev/react-bits) | UI/Design | Modern React design patterns |
| [open-notebook](https://github.com/lfnovo/open-notebook) | Knowledge Management | NotebookLM alternative |
| [Pipecat](https://github.com/pipecat-ai/pipecat) | Voice/Real-time | Extensible voice agent framework |
| [LiveKit](https://github.com/livekit/livekit) | Voice/Real-time | Real-time communication infra |
| [LiteLLM](https://github.com/BerriAI/litellm) | Model Routing | Unified API for 100+ models |
| [LangGraph](https://github.com/langchain-ai/langgraph) | Agent Framework | Multi-agent state machines |
| [CrewAI](https://github.com/crewAI/crewAI) | Agent Framework | Agent crew orchestration |
| [Mem0](https://github.com/mem0ai/mem0) | Memory | Personalized AI memory layer |
| [Zep](https://github.com/getzep/zep) | Memory | Long-term agent memory |
| [Graphiti](https://github.com/graphiti-ai/graphiti) | Memory/Knowledge | Temporal knowledge graphs |
| [MemGPT/Letta](https://github.com/cpacker/MemGPT) | Memory | Stateful agents with memory |
| [e2b](https://github.com/e2b-dev/e2b) | Sandboxing | Secure code execution |
| [Langfuse](https://github.com/langfuse/langfuse) | Observability | Open-source LLM tracing |
| [Ollama](https://github.com/ollama/ollama) | Local Inference | Local model serving |
| [vLLM](https://github.com/vllm-project/vllm) | Inference | High-throughput serving |
| [Unsloth](https://github.com/unslothai/unsloth) | Fine-tuning | Fast LoRA/QLoRA |
| [MCP Specification](https://github.com/modelcontextprotocol/specification) | Protocol | Official MCP spec |
| KAgent (CNCF Sandbox) | K8s Agent | K8s-native agent deployment |
| Andrej Karpathy's auto-research | Research | Automated research workflows |

---

## Coverage Verification

### ✅ Already covered by existing research (in `extra-references/`)

- Five-Subsystem Model (Instruction, Tool, Environment, State, Feedback)
- Comparative matrix of 7 harnesses (Pi, Claude, Codex, Hermes, OpenCode, Goose, Cline)
- Memory systems overview (Mnemosyne, Hindsight, MemGraphRAG)
- Gauntlet Loop pattern
- Prompt compaction (Threadshift)
- MCP overview
- Extension/skill progressive disclosure
- Licensing overview (MIT/Apache/Proprietary)
- Minimal kernel spec (basic)
- Implementation roadmap (basic timeline)

### ✅ Already covered by questions.md (in `extra-references/`)

- 300+ research questions across 20 phases
- Priority hierarchy (P0/P1/P2)
- Architecture decision tree
- Final kernel architecture diagram
- 10 concrete deliverable specifications
- 5 specialized deep-research prompts

### ✅ Completed in this session (2026-10-03)

- Folder restructuring: `extra-references/`, `18-20/`, `tools and skills/`
- CSV query search tool created (`tools/csv_query_search/csv_search.py`)
- Video harvester copied to reusable tools (`tools/video_subtitle_harvester/`)
- MEGA_SKILLS.md master index created
- New learning modules 18-20 initialized with READMEs
- Implementation plan updated with new tracks F, G, H
- AI Engineer CSV data indexed and searchable

### ⚠️ Gaps to fill (not yet deeply researched)

| Gap | Where it goes | Why it matters |
|-----|---------------|----------------|
| DeepSeek harness analysis | `01-teardowns/deepseek-harness.md` | Live config editing, TUI innovation |
| Prime Agent RLM architecture | `01-teardowns/prime-agent.md` | IPython kernel, persistent Python terminal |
| Event bus design patterns | `02-agent-runtime/event-architecture.md` | Foundation for all observability |
| Prompt caching by provider | `03-context-engineering/prompt-caching-strategies.md` | Cost optimization (Anthropic vs OpenAI differ) |
| Actual tool JSON schema standards | `04-tools-system/tool-contract-spec.md` | Interoperability between harnesses |
| Threat modeling for agents | `05-security/threat-model.md` | Prevents folder deletion, data exfil |
| Graphiti temporal knowledge graphs | `06-memory-systems/` | Not in Research1/2, mentioned in questions |
| A2A protocol spec | `08-subagents/a2a-protocols.md` | Multi-agent coordination |
| TUI framework comparison | `12-ui/tui-frameworks.md` | Ink vs Textual vs Bubbletea decision |
| Dashboard wireframes | `12-ui/dashboard-wireframes.md` | Context meter, agent tree visualization |
| Steering mid-execution | `12-ui/steering-patterns.md` | Key UX differentiator |
| Full licensing audit | `14-open-source-tools/licensing-matrix.md` | AGPL traps (Firecrawl!), commercial safety |
| Benchmark suite design | `15-evaluation/` | Scientific validation of architecture choices |
| **LLM model catalog** | `18-llm-routing-and-models/model-catalog.md` | ⭐ Which model for which task |
| **Model routing at runtime** | `18-llm-routing-and-models/routing-strategies.md` | ⭐ Cost optimization, capability matching |
| **Multimodal routing** | `18-llm-routing-and-models/multimodal-routing.md` | ⭐ Vision + audio + code in one agent |
| **Embedding models comparison** | `18-llm-routing-and-models/embedding-models.md` | ⭐ RAG quality depends on this |
| **Production deployment** | `19-tech-stack-and-deployment/deployment-strategies.md` | ⭐ Can't sell without deploying |
| **Harbor/Langfuse integration** | `19-tech-stack-and-deployment/observability-at-scale.md` | ⭐ Production monitoring |
| **Pipecat/LiveKit for voice** | `19-tech-stack-and-deployment/voice-and-realtime.md` | ⭐ Voice agent projects |
| **Open-source encyclopedia** | `20-real-world-projects/open-source-encyclopedia.md` | ⭐ Reusable components catalog |
| **RAG data pipeline** | Full transcript extraction + RAG indexing | ⭐ Knowledge base for all learning |

---

## Learning Methodology

Each research document follows this template:

```markdown
# [Topic Name]

## What This Is
One-paragraph explanation.

## Why It Matters for Harness Design
Direct connection to building commercial harnesses.

## How It Works
Technical deep-dive with diagrams and code.

## How Existing Harnesses Do It
| Harness | Approach | Source |
|---------|----------|--------|

## Design Decisions for Our Harness
What we should adopt, adapt, or avoid.

## Key Takeaways
Bullet-point summary.

## References
Links to repos, docs, papers.
```

### Interlinking Strategy
- Every file uses relative markdown links: `[tool contracts](../04-tools-system/tool-contract-spec.md)`
- Every concept first-mentioned gets linked to its definition in `00-foundations/glossary.md`
- Cross-references use consistent anchors for future HTML conversion
- Notes in `notes/insights.md` reference source files

---

## Research Agent Methodology

> **Key Idea:** Each stub file will be enriched by a research agent (even a low-reasoning model). The agent reads the `SKILL.md` file for instructions, then uses a topic-specific research prompt.

### How It Works

1. **You (the human)** pick a stub file to enrich
2. **You give the agent** this prompt format: `"Read SKILL.md at d:\Curion\PI AGENT LEARNING\SKILL.md, then research and enrich the file at [path to stub]. Use web search."`
3. **The agent** follows the SKILL.md instructions: reads the stub → reads questions.md → reads existing research → does web search → writes the enriched document → updates cross-references
4. **You review** the output and request corrections

### The SKILL.md File

Located at `d:\Curion\PI AGENT LEARNING\SKILL.md` — this is the master instruction set that any research agent reads before starting work. It contains:
- Step-by-step research process (7 steps)
- Mandatory output template (all sections required)
- Search strategy patterns for different document types
- Quality checklist
- Rules (never fabricate sources, always cite URLs, note licenses, etc.)

### Research Prompt Categories

There are **3 categories** of research documents, each needing a slightly different prompt approach:

| Category | Folders | Prompt Style |
|----------|---------|-------------|
| **Teardowns** | `01-teardowns/` | Focus on a single harness — repo structure, source code, docs |
| **Architecture Topics** | `02-13` | Focus on a subsystem concept — compare how multiple harnesses handle it |
| **Ecosystem Surveys** | `14-16` | Focus on external tools/libraries — features, licensing, integration |

Below are **2 fully detailed example research prompts** — one for a Teardown, one for an Architecture Topic. The research agent should use these as templates to generate its own prompts for remaining modules.

---

## Example Research Prompt 1: Harness Teardown (01-teardowns/)

> **Use this as the template for:** `pi-agent.md`, `claude-code.md`, `hermes-agent.md`, `codex.md`, `opencode.md`, `goose.md`, `cline.md`, `deepseek-harness.md`, `prime-agent.md`, `aider.md`

```
RESEARCH TASK: Deep source-level teardown of the Hermes Agent harness

INSTRUCTIONS:
First, read the research skill file at d:\Curion\PI AGENT LEARNING\SKILL.md 
and follow its process exactly.

TARGET FILE: d:\Curion\PI AGENT LEARNING\01-teardowns\hermes-agent.md

CONTEXT FILES TO READ FIRST (extract what is already known, do NOT repeat it):
- d:\Curion\PI AGENT LEARNING\Research1.md (sections on Hindsight, Mnemosyne, memory providers)
- d:\Curion\PI AGENT LEARNING\Research2.md (Hermes section starting at "### Hermes Agent")
- d:\Curion\PI AGENT LEARNING\questions.md (Phase 1 questions Q16-Q43)
- d:\Curion\PI AGENT LEARNING\00-foundations\glossary.md (use standard terminology)

RESEARCH OBJECTIVE:
Produce a comprehensive source-level teardown of the Hermes Agent 
(https://github.com/NousResearch/hermes-agent). This is NOT a feature 
summary — it is an architectural analysis that traces how the system 
actually works internally by examining source code, documentation, and 
community discussion.

SPECIFIC QUESTIONS TO ANSWER (from questions.md Q16-Q43):
- Q16: What is the process architecture? (Python monorepo structure, key modules)
- Q17: Where is the main agent loop? (exact file: run_agent.py, class: AIAgent)
- Q18: Where is model invocation? (provider resolver, API call mechanism)
- Q19: Where are tools registered? (tools/registry.py, self-registration pattern)
- Q20: How are tools serialized for models? (schema generation for system prompt)
- Q21: How are tool calls validated? (input schema checking)
- Q22: Where does permission checking occur? (dangerous command classifier)
- Q23: Where does tool execution occur? (run_tools.py, 7 execution backends)
- Q24: How is session state stored? (SQLite per profile, FTS5)
- Q25: How is context assembled? (system prompt + identity + tools + skills + history)
- Q26: How is context compressed? (context_compressor.py, Anthropic prefix caches)
- Q27: How are events emitted? (callback system, event bus)
- Q28: How is streaming represented? (provider-specific streaming)
- Q29: How are errors propagated? (retry with alt providers)
- Q30: How is cancellation implemented?
- Q31: How are subagents spawned? (A2A messaging v1.0)
- Q32: How do subagents receive context? (profile isolation)
- Q33: How are subagent permissions defined? (per-profile config)
- Q34: How is memory stored? (pluggable memory providers, SQLite default)
- Q35: How are extensions loaded? (pip entry points, ~/.hermes/plugins/)
- Q36: How are skills loaded? (on-demand injection)
- Q37: How are plugins loaded? (directory scan + pip entry points)
- Q38: How is configuration discovered? (YAML ~/.hermes/config.yaml)
- Q39: What is global vs project-local? (profile-based isolation)
- Q40: What is dynamically reloadable?
- Q41: What is hot-reloadable?
- Q42: What is persisted? (sessions, memory, config)
- Q43: What is intentionally NOT persisted?

WEB SEARCH STRATEGY:
1. Search "NousResearch hermes-agent GitHub" — find the main repository
2. Search "site:github.com NousResearch/hermes-agent docs" — find documentation
3. Search "site:github.com NousResearch/hermes-agent run_agent.py" — find agent loop source
4. Search "site:github.com NousResearch/hermes-agent tools registry" — find tool system
5. Search "site:github.com NousResearch/hermes-agent memory provider plugin" — memory architecture
6. Search "site:github.com NousResearch/hermes-agent context_compressor" — compaction
7. Search "hermes agent memory providers comparison review" — community experience
8. Search "hermes agent plugin development guide" — extension API
9. Search "hermes agent A2A agent to agent" — subagent system
10. Search "hermes agent security dangerous command approval" — permission model
11. Search "hermes agent desktop electron" — UI architecture
12. Search "hermes agent vs claude code vs pi" — comparative analysis
13. Read any Reddit threads (r/hermesagent) for real-world usage experiences

OUTPUT FORMAT — The enriched document MUST have these sections:

# Hermes Agent — Source-Level Teardown

> Status: ✅ Researched
> Priority: P0
> Questions addressed: Q16-Q43
> Last updated: [today]

## Overview & Philosophy
What Hermes is, who made it, what makes it architecturally distinct.

## Repository Structure
Map out the actual directory tree. Key files, key modules, what lives where.
```
hermes-agent/
├── run_agent.py         ← [what this does]
├── run_tools.py         ← [what this does]
├── tools/
│   ├── registry.py      ← [what this does]
│   └── [specific tools]
├── plugins/
│   ├── memory/          ← [what this does]
│   └── ...
├── website/docs/        ← [documentation]
└── ...
```

## Agent Loop — How It Actually Runs
Trace the execution flow from user input to final output.
Include a state diagram (mermaid or ASCII).
Cite exact file names and class names.

## Tool System
- How tools self-register (the registry.register pattern)
- The 7 execution backends (local, Docker, SSH, etc.)
- Tool schema format
- How tools appear in the system prompt

## Memory Architecture
- Built-in SQLite memory
- Pluggable memory providers (interface, how to implement one)
- How memory is retrieved before each LLM call
- How memory survives compaction and session changes

## Context & Compaction
- How context_compressor.py works
- Anthropic prefix caching integration
- What triggers compaction
- What is preserved vs discarded

## Session Management
- SQLite per-profile storage
- FTS5 full-text search
- Parent-child session lineage
- Resume and fork mechanics

## Plugin & Extension System
- Discovery: pip entry points + directory scan
- What plugins can register: tools, hooks, CLI commands
- Memory provider plugins
- Context engine plugins
- Lifecycle hooks

## Security Model
- User authorization (allowlists)
- Dangerous command classifier (smart/manual/off)
- File write denylists
- Container isolation (Docker/Singularity/Modal)
- Profile isolation
- Shell injection checks
- /yolo bypass mode

## Subagent & A2A
- Agent-to-Agent messaging (v1.0)
- Profile-based delegation
- How agents hand off tasks

## Provider Abstraction
- Provider resolver mapping
- 18+ providers supported
- Key/URL/OAuth configuration
- How model switching works

## UI & Observability
- CLI TUI (spinners, tool-call callbacks)
- Desktop Electron app
- Voice mode
- Gateway (Telegram/Discord bots)
- Event callback system

## Configuration
- YAML config structure
- Profile isolation
- CLI override mechanism

## Licensing & Commercial Use
- MIT license — fully permissive
- Key dependencies and their licenses

## Answered Questions
[Answer each Q16-Q43 explicitly with citations]

## Key Takeaways
[5-10 bullet points of the most important findings]

## References
[All URLs used, with descriptions]

AFTER WRITING THE DOCUMENT:
1. Add any new terms to 00-foundations/glossary.md
2. Add top 3 insights to notes/insights.md
3. Add any pitfalls discovered to notes/gotchas.md
4. Add all new URLs to notes/bookmarks.md
5. Add any unanswered questions to notes/open-questions.md
```

### How to adapt this prompt for other teardowns

For each harness in `01-teardowns/`, the agent should:
1. **Copy this prompt structure**
2. **Replace** "Hermes Agent" with the target harness name
3. **Replace** the GitHub URL with the target repo
4. **Keep** Q16-Q43 as the question set (same for all teardowns)
5. **Adjust** search queries to target the specific harness
6. **Adjust** the output sections based on what the harness actually has (e.g., Pi has no subagents, so that section would note "Not supported")

---

## Example Research Prompt 2: Architecture Topic (02-16 folders)

> **Use this as the template for:** All files in folders `02-agent-runtime/` through `16-product-blueprints/` — any subsystem or concept-level research document.

```
RESEARCH TASK: Deep research on Agent Memory Systems for AI Harnesses

INSTRUCTIONS:
First, read the research skill file at d:\Curion\PI AGENT LEARNING\SKILL.md 
and follow its process exactly.

TARGET FILE: d:\Curion\PI AGENT LEARNING\06-memory-systems\memory-classes.md

CONTEXT FILES TO READ FIRST (extract what is already known, do NOT repeat it):
- d:\Curion\PI AGENT LEARNING\Research1.md (sections: "Cognitive Architectures", 
  "Layer 1: Mnemosyne", "Layer 2: Hindsight", "Layer 3: MemGraphRAG")
- d:\Curion\PI AGENT LEARNING\Research2.md (Memory rows in the comparison matrix,
  plus each harness's Memory section)
- d:\Curion\PI AGENT LEARNING\questions.md (Phase 11 questions Q206-Q223)
- d:\Curion\PI AGENT LEARNING\00-foundations\glossary.md (memory-related terms)

RESEARCH OBJECTIVE:
Produce a comprehensive technical document on memory system architectures 
for AI agent harnesses. This document serves as a LEARNING resource — it 
must explain concepts clearly enough that someone building their first 
harness can understand what memory classes exist, why they matter, how 
they're implemented in practice, and which approach to choose.

The goal is NOT an academic literature review. It is a practical engineering 
guide that directly informs harness architecture decisions.

SPECIFIC QUESTIONS TO ANSWER (from questions.md Phase 11, Q206-Q223):

- Q206: When is memory written? (automatic vs manual vs model-proposed)
- Q207: Who decides what to memorize? (model, user, system rules)
- Q208: Is memory automatic? (compare: Hermes auto-memory vs Pi manual)
- Q209: Can the model propose memory? (retain() in Hindsight)
- Q210: Can users approve memory? (approval workflows)
- Q211: How is stale memory removed? (TTL, veracity scoring, manual pruning)
- Q212: How is contradictory memory handled? (Bayesian confidence in Mnemosyne,
        CARA in Hindsight, conflict resolution strategies)
- Q213: How is memory scoped? (session, project, user, organization)
- Q214: What is private vs shared memory? (multi-user, multi-agent scenarios)
- Q215: How are memories ranked? (relevance scoring, recency weighting)
- Q216: How are memories retrieved? (vector search, graph traversal, 
        fact-based search, temporal search — Polyphonic Recall)
- Q217: How are memories summarized? (Observations in Hindsight)
- Q218: How do memories influence prompts? (injection point, priority)
- Q219: How do memories influence tool selection?
- Q220: How do memories survive compaction? (extraction during summarization)
- Q221: How do memories survive session deletion?
- Q222: How do memories get exported? (backup, migration)
- Q223: How do users inspect memories? (TUI/GUI for memory browsing)

ADDITIONAL TOPICS TO COVER:

1. **Memory Class Taxonomy:**
   Define and explain each class with examples:
   - Working Memory (current context window)
   - Session Memory (within one conversation)
   - Episodic Memory (records of past actions + outcomes)
   - Semantic Memory (facts, preferences, knowledge)
   - Procedural Memory (learned workflows, how-to knowledge)
   - Project Memory (codebase-specific knowledge)
   - User Memory (preferences, style, past interactions)
   - Organizational Memory (team/company knowledge)

2. **Storage Backends:**
   Compare storage approaches:
   - SQLite (local, fast, used by Mnemosyne, Hermes)
   - Vector databases (Qdrant, Pinecone, pgvector)
   - Knowledge graphs (Graphiti, Neo4j)
   - File-based (Memory.md pattern)
   - Hybrid approaches

3. **Retrieval Strategies:**
   - Single-strategy (just vector search — most common, most limited)
   - Multi-strategy / Polyphonic Recall (vector + graph + fact + temporal)
   - TEMPR (Hindsight's Temporal Entity Memory Priming Retrieval)
   - Reciprocal Rank Fusion for combining results
   - Cross-encoder reranking

4. **Conflict Resolution:**
   - Simple overwrite (most harnesses — bad practice)
   - Veracity Consolidation (Mnemosyne — Bayesian confidence)
   - CARA dispositions (Hindsight — Skepticism, Literalism, Empathy)
   - Timestamped validity windows (Graphiti)

5. **The Pluggable Memory Interface:**
   Design a memory provider abstraction that supports:
   - Built-in local memory (always available)
   - One external provider at a time (Hindsight, Mem0, custom)
   - Common interface: store(), retrieve(), forget(), inspect()

WEB SEARCH STRATEGY:
1. Search "AI agent memory architecture 2025 2026" — latest approaches
2. Search "Hindsight memory framework TEMPR CARA documentation"
3. Search "site:hindsight.vectorize.io documentation"
4. Search "Mnemosyne AI agent memory SQLite polyphonic recall"
5. Search "Graphiti temporal knowledge graph AI agent"
6. Search "site:github.com NousResearch/hermes-agent memory provider"
7. Search "Mem0 AI memory layer documentation"
8. Search "AI agent long term memory best practices"
9. Search "vector database comparison Qdrant Pinecone pgvector"
10. Search "agent memory contradictory facts resolution"
11. Search "arXiv agent memory systems survey"
12. Search "MemPalace vs Hindsight comparison"
13. Search "AI agent memory benchmark evaluation"
14. Search "pluggable memory interface design pattern"
15. Read the Hindsight paper: https://arxiv.org/html/2512.12818v1
16. Read MemGraphRAG paper: https://arxiv.org/html/2606.00610v1

OUTPUT FORMAT — The enriched document MUST have these sections:

# Memory Classes — Agent Memory Architecture

> Status: ✅ Researched  
> Priority: P0
> Questions addressed: Q206-Q223
> Last updated: [today]

## What This Is
[Clear one-paragraph definition of agent memory systems]

## Why It Matters for Harness Design
[2-3 paragraphs on why memory is critical for commercial harnesses.
 Include: token cost savings, quality improvement, user experience,
 competitive differentiation. Emphasize that without memory, every 
 session starts from zero — which makes long-horizon tasks impossible.]

## Memory Class Taxonomy
[Define all 8 classes with clear examples and use cases.
 Include a diagram showing how they relate to each other.]

## How It Works — Technical Deep-Dive

### Storage Backends
[Compare SQLite, vector DBs, knowledge graphs, file-based, hybrid.
 Include a comparison table with: speed, scalability, query types, 
 complexity, dependencies, licensing.]

### Retrieval Strategies
[Explain single-strategy vs multi-strategy (Polyphonic Recall).
 Include architecture diagrams. Show how TEMPR works.
 Explain Reciprocal Rank Fusion with a worked example.]

### Write Strategies
[When to write memory: automatic triggers, model-proposed, user-approved.
 Include a flowchart for the memory write decision.]

### Conflict Resolution
[Compare approaches: overwrite, Bayesian (Mnemosyne), CARA (Hindsight), 
 timestamped (Graphiti). Include worked examples of each.]

### Memory Lifecycle
[Creation → Retrieval → Update → Contradiction Resolution → 
 Staleness Detection → Pruning/Archival → Export]

## How Existing Harnesses Do It
[Comparison table with Pi, Claude Code, Hermes, Codex, OpenCode, 
 Goose, Cline. Include what each actually implements vs what's 
 theoretical.]

## The Pluggable Memory Interface
[Design the abstraction layer. Include:
 - Interface definition (TypeScript or pseudocode)
 - Built-in local provider
 - External provider examples
 - How providers are registered and switched
 - Hermes's model as reference architecture]

## Design Decisions for Our Harness
[ADOPT / ADAPT / AVOID analysis with justifications]

## Answered Questions
[Answer each Q206-Q223 explicitly with source citations]

## Key Takeaways
[5-10 bullet points]

## References
[All URLs with descriptions]

AFTER WRITING THE DOCUMENT:
1. Add new memory-related terms to 00-foundations/glossary.md
2. Add top 3 memory insights to notes/insights.md  
3. Add any memory pitfalls to notes/gotchas.md
4. Add memory-related URLs to notes/bookmarks.md
5. Add unanswered memory questions to notes/open-questions.md
6. If Hindsight or Mnemosyne documents exist as separate stubs 
   (06-memory-systems/hindsight-tempr-cara.md etc.), note that 
   those will be enriched separately — don't try to write their 
   full content here, just reference them.
```

### How the agent derives prompts for ALL remaining modules

The agent does NOT need a custom prompt for every single file. It uses this formula:

**For any teardown file (01-teardowns/):**
1. Copy Example Prompt 1 structure
2. Replace harness name, GitHub URL, and search queries
3. Keep Q16-Q43 as the question set
4. Run

**For any architecture/concept file (02 through 13):**
1. Copy Example Prompt 2 structure
2. Replace the topic, target file path, and question numbers
3. Look up the relevant questions in `questions.md` by the phase number shown in the stub
4. Adjust the "ADDITIONAL TOPICS TO COVER" based on the stub's topic list
5. Adjust search queries for the specific topic
6. Run

**For ecosystem/tools files (14-open-source-tools/):**
1. Use Example Prompt 2 structure but focus searches on:
   - GitHub repos for each tool
   - License files specifically (`site:github.com [tool]/LICENSE`)
   - "vs" comparisons between alternatives
   - Integration guides with AI agents
2. The licensing-matrix.md needs special treatment: search for EXACT license text of EACH tool

**For product blueprints (16-product-blueprints/):**
1. Use Example Prompt 2 structure
2. Read ALL completed architecture documents (02-13) first
3. Focus on: which subsystems to activate, which tools to load, what the system prompt should contain
4. Questions come from Phase 20 in questions.md

**For reference specs (17-reference-specs/):**
1. These are NOT research tasks — they are synthesis tasks
2. The agent reads ALL completed research documents and produces specifications
3. No web search needed — pure synthesis of existing research

---

## Immediate Next Steps

1. ✅ **Folder structure created** — All 22+ directories and starter files exist
2. ✅ **`00-foundations/` written** — 4 fully enriched documents
3. ✅ **`SKILL.md` created** — Research agent instruction set
4. ✅ **Example prompts provided** — 2 detailed templates above
5. ✅ **`01-teardowns/hermes-agent.md` researched** — Full teardown complete
6. ✅ **Folder restructuring** — `extra-references/`, new modules 18-20, `tools and skills/`
7. ✅ **Reusable tools created** — `csv_query_search`, `video_subtitle_harvester` in tools/
8. ✅ **MEGA_SKILLS.md** — Master index of all tools and skills
9. ⬜ **User to provide YouTube channel links** — For extraction pipeline
10. ⬜ **Begin LLM routing research** — Module 18 is critical for all projects
11. ⬜ **Begin open-source encyclopedia** — Catalog reusable components
12. ⬜ **Continue teardowns** — Remaining harnesses (A5-A7)
13. ⬜ **RAG data pipeline** — Future: local RAG indexer for all transcript data

---

## 📋 Master Task List

### Phase 1 — Immediate (This Session + Next)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | ✅ Read & understand implementation_plan.md | ✅ Done | |
| 1.2 | ✅ Read & understand README.md | ✅ Done | |
| 1.3 | ✅ Explore all existing directories | ✅ Done | |
| 1.4 | ✅ Move questions.md, Research1/2.md, suggestions.md → `extra-references/` | ✅ Done | Archived, still referenceable |
| 1.5 | ✅ Create `extra-references/README.md` | ✅ Done | |
| 1.6 | ✅ Create `tools and skills/tools/` directory structure | ✅ Done | |
| 1.7 | ✅ Create `tools and skills/skills/` directory | ✅ Done | |
| 1.8 | ✅ Copy video_harvester to `tools/video_subtitle_harvester/` | ✅ Done | |
| 1.9 | ✅ Create `csv_query_search` tool (`csv_search.py`) | ✅ Done | Searchable CSV data |
| 1.10 | ✅ Create `MEGA_SKILLS.md` master index | ✅ Done | |
| 1.11 | ✅ Create `18-llm-routing-and-models/` with README | ✅ Done | |
| 1.12 | ✅ Create `19-tech-stack-and-deployment/` with README | ✅ Done | |
| 1.13 | ✅ Create `20-real-world-projects/` with README | ✅ Done | |
| 1.14 | ✅ Update implementation_plan.md with all diffs | ✅ Done | This update |
| 1.15 | ⬜ User provides YouTube channel links | Waiting | User input needed |
| 1.16 | ⬜ User provides additional open-source repo links | Waiting | User input needed |

### Phase 2 — Data Pipeline (Extract & Store)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Extract video links from new YouTube channels | ⬜ Pending | Uses `youtube_channel_extractor` |
| 2.2 | Run video_subtitle_harvester on key videos | ⬜ Pending | Priority: agent harness videos |
| 2.3 | Store transcripts in `Youtube and Learning matarials/` | ⬜ Pending | Organized by channel |
| 2.4 | Query AI Engineer CSVs for relevant agent talks | ⬜ Pending | Uses `csv_search.py` |
| 2.5 | Extract and catalog talk summaries by topic | ⬜ Pending | Agent engineering, RAG, security, etc. |
| 2.6 | Download full transcripts from `aie-transcripts.csv` URLs | ⬜ Pending | JSON/CSV transcript data |

### Phase 3 — Research & Enrichment (Learning Modules)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Research remaining teardowns (A5: Codex, OpenCode, Goose, Cline) | ⬜ Pending | P0 |
| 3.2 | Research innovative teardowns (A6: DeepSeek, Prime Agent, Aider) | ⬜ Pending | P1 |
| 3.3 | Build comparison matrix (A7) | ⬜ Pending | After teardowns |
| 3.4 | LLM model catalog — comprehensive model list | ⬜ Pending | P0, Track F |
| 3.5 | Model routing strategies research | ⬜ Pending | P0, Track F |
| 3.6 | Capability matrix (vision/audio/code/reasoning) | ⬜ Pending | P0, Track F |
| 3.7 | Embedding models comparison for RAG | ⬜ Pending | P0, Track F |
| 3.8 | Open-source encyclopedia — catalog all repos & tools | ⬜ Pending | P1, Track H |
| 3.9 | RAG application patterns from tutorial videos | ⬜ Pending | P1, Track H |
| 3.10 | Agent loop & state machine (B1) | ⬜ Pending | P0 |
| 3.11 | Context assembly & caching (B3) | ⬜ Pending | P0 |
| 3.12 | Tool contracts & MCP (B4) | ⬜ Pending | P0 |
| 3.13 | Security & sandboxing (B5) | ⬜ Pending | P0 |
| 3.14 | Memory system research (C1) | ⬜ Pending | P0 |

### Phase 4 — Tools & Infrastructure

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Create `youtube_channel_extractor` tool | ⬜ Pending | Extracts all video links from channel |
| 4.2 | Create `memory_manager` tool | ⬜ Pending | Persistent memory across sessions |
| 4.3 | Create `rag_local_indexer` tool (future) | ⬜ Pending | Local embeddings + vector search |
| 4.4 | Create `github_repo_analyzer` tool | ⬜ Pending | Clone, analyze structure, deps, license |
| 4.5 | Create `transcript_to_notes` tool | ⬜ Pending | Raw transcripts → structured notes |
| 4.6 | Create `model_cost_calculator` tool | ⬜ Pending | Compare LLM costs across providers |
| 4.7 | Improve index.html dashboard | ⬜ Pending | Filters, search, group by event/topic |

### Phase 5 — Production & Deployment Research

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1 | Harbor framework deep-dive | ⬜ Pending | Observability, guardrails |
| 5.2 | Deployment strategies for AI agents | ⬜ Pending | Cloud/edge/hybrid |
| 5.3 | CI/CD pipelines for AI apps | ⬜ Pending | Agent testing, prompt versioning |
| 5.4 | Pipecat & LiveKit research | ⬜ Pending | Voice agent tech stack |
| 5.5 | Compliance & governance research | ⬜ Pending | SOC2, HIPAA, GDPR for AI |
| 5.6 | Client pitching guide | ⬜ Pending | How to sell AI agent projects |

### Phase 6 — Project Implementation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 6.1 | Apply learnings to RAG Harness project | ⬜ Pending | `PROJECTS/RAG Harness/` |
| 6.2 | Apply learnings to Voice RAG Agent | ⬜ Pending | `PROJECTS/VOICE RAG AGENT/` |
| 6.3 | Apply learnings to zenswear-harness | ⬜ Pending | `PROJECTS/zenswear-harness/` |
| 6.4 | Build mini RAG application (learning project) | ⬜ Pending | Inside `scratch/` |
| 6.5 | Build AI talk search application | ⬜ Pending | Better version of ai.engineer/talks |

---

## Design Philosophy

> **Find the smallest architecture capable of expressing everything we care about.**

- Minimal kernel + explicit capability boundaries
- Lazy loading + strong policy enforcement
- Complete observability
- No bloat — every component earns its place via the decision tree
- **Choose the right model for the right task** — cost and capability optimization
- **Everything is deployable** — theory without production is worthless
- **Build once, reuse everywhere** — tools and skills are project-independent
- **Learn from the best** — extract patterns from real-world implementations
- **Knowledge compounds** — every transcript, every talk, every repo adds to our encyclopedia
