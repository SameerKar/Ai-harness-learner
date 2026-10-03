# 🤖 AI Harness Learner

> **Mastering commercial-grade AI Agent Harnesses, Context Engineering, Tool Ecosystems, and Multi-Agent Runtimes.**

Welcome to **AI Harness Learner** — a deep research, architectural analysis, and engineering repository dedicated to building production-ready AI agent harnesses and autonomous systems.

---

## 📂 Repository Structure

```
├── PI AGENT LEARNING/               # Comprehensive 21-module harness learning curriculum
│   ├── 00-foundations/              # Core definitions, control theory & harness primitives
│   ├── 01-teardowns/                # Deep source teardowns (Pi, Codex, Claude Code, etc.)
│   ├── 02-agent-runtime/            # Core ReAct loop, state machines, interrupt handling
│   ├── 03-context-engineering/      # Prompts, assembly, context compaction & caching
│   ├── 04-tools-system/             # MCP client/server, tool routing & execution sandboxes
│   ├── 05-security/                 # Sandboxing, capability boundaries & guardrails
│   ├── 06-memory-systems/           # Working, episodic, semantic & hierarchical memory
│   ├── 07-sessions/                 # Tree-structured sessions, branching & recovery
│   ├── 08-subagents/                # Orchestration, multi-agent delegators & Gauntlet loops
│   ├── 09-extensions-sdk/           # Skills, plugins, hooks & agent capability extensions
│   ├── 10-providers/                # Model abstraction layer, fallback chains & local inference
│   ├── 11-observability/            # OpenTelemetry, tracing, latency & flight recorders
│   ├── 12-ui/                       # Terminal UIs (Ink/React), Web interfaces & steering
│   ├── 13-config/                   # Dynamic configuration, hot reloading & schema validation
│   ├── 14-open-source-tools/        # Headless browsing, scraping & tool integrations
│   ├── 15-evaluation/               # Evals, benchmark suites & regression testing
│   ├── 16-product-blueprints/       # Commercial blueprints (coding, media, research, personal)
│   ├── 17-reference-specs/          # Production RFCs, specifications & protocol contracts
│   ├── 18-llm-routing-and-models/   # Semantic routers, model tiering & cost/latency routing
│   ├── 19-tech-stack-and-deployment/# Docker, Kubernetes, serverless & production deployment
│   ├── 20-real-world-projects/      # Complete project architectures and case studies
│   ├── Youtube and Learning matarials/ # Transcripts, extracted CSVs, channels & playlists
│   ├── implementation_plan.md       # Master roadmap & phase tracker
│   └── research_plans.md            # Actionable per-module research plans
│
├── PROJECTS/                        # Active agent implementation projects
│   ├── zenswear-harness/            # TypeScript monorepo harness (Core runtime + Ink TUI)
│   ├── RAG Harness/                 # Retrieval-augmented agent harness implementation
│   ├── VOICE RAG AGENT/             # Bidirectional audio & real-time voice agent
│   ├── Social Media Manager-Analyzer/ # Multi-platform analytics & content generation agent
│   └── Real Estate VR CARD/         # Spatial & immersive VR property agent assistant
│
├── tools and skills/                # Shared developer tools & agent skills
│   ├── tools/
│   │   ├── video_subtitle_harvester/  # YouTube subtitle, transcript & keyframe extractor
│   │   ├── csv_query_search/          # Vector/keyword search across conference talks & transcripts
│   │   └── youtube_channel_extractor/ # Bulk channel video metadata & playlist harvest tool
│   └── skills/                      # Specialized agent skills & cheatsheets
│
└── .agents/                         # Customization skills, guardrails & coding standards
```

---

## 🎯 Architecture & Design Philosophy

> **Find the smallest architecture capable of expressing everything we care about.**

- **Minimal Kernel:** Keep the core agent loop lean, deterministic, and interruptible.
- **Explicit Capability Boundaries:** Clear permissions for tools, filesystem, network, and execution.
- **Pluggable Protocols:** First-class Model Context Protocol (MCP) and structured tool registries.
- **Complete Observability:** Full event-stream emission for debugging, recording, and replay.

---

## 🚀 Key Tracking & Plans

- 📋 [Master Implementation Plan](PI%20AGENT%20LEARNING/implementation_plan.md)
- 🔬 [Per-Module Research Plans](PI%20AGENT%20LEARNING/research_plans.md)
- 📺 [YouTube Channels & Learning Index](PI%20AGENT%20LEARNING/Youtube%20and%20Learning%20matarials/channels_index.md)
- 🛠️ [Mega Skills Registry](tools%20and%20skills/MEGA_SKILLS.md)

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js** (v20+) & **pnpm** (v9+)
- **Python** (v3.10+)
- **Git**

### 2. Exploring Zenswear Harness
```bash
cd "PROJECTS/zenswear-harness"
pnpm install
pnpm build
```

### 3. Running Video & Transcript Search Tool
```bash
python "tools and skills/tools/csv_query_search/csv_search.py" --help
```

---

## 📜 License

MIT License. See individual modules and dependencies for specific third-party licenses.
