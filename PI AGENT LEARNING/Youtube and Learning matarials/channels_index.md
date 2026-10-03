# YouTube Channels & Learning Sources Index

> **Purpose:** Track all YouTube channels and video sources used for learning.
> **Last Updated:** 2026-10-03

---

## Channels Registry

### 1. AI Engineer (@aiaboratecon / ai.engineer)
- **URL:** https://www.youtube.com/@aiaboratecon
- **Website:** https://ai.engineer/talks
- **Focus:** Agent engineering, harnesses, deployment, MCP, RAG, security, observability
- **Data Status:** ✅ Full CSV export available (talks, speakers, topics, chapters, transcripts, organizations)
- **Data Location:** `AI engineerinng Youtube Channel/aie-*.csv`
- **Relevance:** HIGH — Primary source for harness architecture, agent engineering patterns, production deployment
- **Key Talks (Harness-related):**
  - "Codex, Behind the Harness" — OpenAI Codex harness internals (Dominik Kundel)
  - "What if the Harness Mattered More Than the Model" — Etsy (Aditya Bhargava)
  - "Beyond the Harness" — Adaptive engineering (Rajiv Chandegra)
  - "A Genius With Amnesia" — Polygraph meta-harness (Victor Savkin)
  - "Pruning Agent Skills" — Case harness with state machine (Nick Nisi)
  - "Anthropic's Applied AI team on Agentic Surfaces" — Claude Agent SDK (Gagan Bhat)
  - "Ship It: Building Production-Ready Agents" — Production patterns
  - "RAG Agents in Prod: 10 Lessons" — Douwe Kiela (creator of RAG)

### 2. Alejandro AO (@alejandro_ao)
- **URL:** https://www.youtube.com/@alejandro_ao
- **Channel ID:** UC1oXUA7qgs0GZc_yk46K2OQ
- **Bio:** Developer Advocate @HuggingFace
- **Focus:** RAG, agents from scratch, LangChain, LlamaIndex, memory systems, multimodal AI
- **Data Status:** ⬜ Needs video link extraction
- **Relevance:** HIGH — Hands-on tutorials for building agents from scratch, understanding memory
- **Key Videos (Identified):**
  - "Intro to Agents - Create an Agent from Scratch (No Frameworks)" — https://www.youtube.com/watch?v=Fj2F1vH6p04
  - "Build an AI Agent That Searches Docs + Web | LangChain" — https://www.youtube.com/watch?v=83n7vD053fA
  - "Create a RAG Chain using LangChain 0.1" — https://www.youtube.com/watch?v=yv1JHVCKD3o
  - "Agentic RAG, Open LLMs, FREE Embeddings | n8n" — https://www.youtube.com/watch?v=vVjV-7O7sLg
  - "LangChain Memory Tutorial | Building ChatGPT Clone" — https://www.youtube.com/watch?v=kYyv1J-s5rE
  - "Python: Create a ReAct Agent from Scratch" — https://www.youtube.com/watch?v=wX-y8T_p-Q0
  - "Create an Open Deep Research Multi-Agent in Python" — https://www.youtube.com/watch?v=6lO-Q7K-JgY
  - "Advanced RAG with LlamaIndex" — metadata extraction, indexing
  - "Multimodal RAG (PDFs with images and tables)" — LangChain + advanced parsing
- **Playlists to Track:**
  - "Learn to Build Agents"
  - "Create AI Applications"
  - "Learn MCP Servers"

### 3. KodeKloud (@KodeKloud)
- **URL:** https://www.youtube.com/@KodeKloud
- **Channel ID:** UCSWj8mqQCcrcBlXPi4ThRDQ
- **Bio:** 1M+ learners mastering DevOps and Cloud through Learn-By-Doing
- **Focus:** Kubernetes, DevOps, Docker, AI agents deployment, KAgent, MCP, system design
- **Data Status:** ⬜ Needs video link extraction (filter: AI/agent-related only)
- **Relevance:** HIGH for deployment & infra — K8s agent deployment, MCP in infra, CI/CD for AI
- **Key Videos (Identified):**
  - "Debug Kubernetes with kagent (Full Hands-On Demo)" — Live KAgent debugging
  - "Building AI Agents That Manage Kubernetes" — Agent guardrails, human-in-the-loop
  - "kagent Explained: Orchestrating AI Agent Crew in K8s" — CRD model, OpenTelemetry
  - "MCP Explained Simply: How AI Can Actually Do Things Now" — MCP foundations
  - "kagent + RAG: K8s Agent That Actually Understands Operations" — RAG + K8s
  - "RAG Explained For Beginners" — RAG fundamentals
- **Courses to Reference:**
  - "KAgent: Host Your AI Agents on Kubernetes"
  - "AI Agents Fundamentals Course" (LLMs, LangChain, RAG, MCP)
  - "Crash Course: AI-Powered DevOps"

---

## Channel-to-Module Mapping

| Channel | Relevant Learning Modules |
|---------|--------------------------|
| **AI Engineer** | 01 (teardowns), 02 (runtime), 03 (context), 04 (tools/MCP), 05 (security), 06 (memory), 08 (subagents), 11 (observability), 15 (evaluation), 18 (LLM routing), 19 (deployment) |
| **Alejandro AO** | 02 (agent loop from scratch), 03 (context/RAG), 04 (tools), 06 (memory), 08 (multi-agent), 18 (model selection), 20 (real-world projects) |
| **KodeKloud** | 04 (MCP), 05 (security), 11 (observability), 19 (deployment, K8s, CI/CD), 20 (real-world K8s agents) |

---

## Videos Explicitly Referenced by User

| Video | Topic | Module |
|-------|-------|--------|
| [RAG Application E2E](https://www.youtube.com/watch?v=bjkjaqUZl4E) | End-to-end RAG build | 03, 20 |
| [Production RAG](https://www.youtube.com/watch?v=UhILMAhpxFQ) | Sophisticated production RAG | 03, 19, 20 |
| [Databricks Agent](https://www.youtube.com/watch?v=ObTPqBGsEbA) | Enterprise agent engineering | 02, 18, 20 |
