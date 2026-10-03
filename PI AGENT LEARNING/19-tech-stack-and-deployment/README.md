# Tech Stack, Deployment & Production Systems

> Status: ⬜ Not started
> Priority: P0
> Last updated: 2026-10-03

## Why This Module Exists

Building an AI agent isn't enough — you have to **deploy it at scale**, secure it, monitor it, and sell it. This module covers everything beyond code: infrastructure, CI/CD, cloud, observability at scale, client pitching, and the new SDLC for AI-native applications.

## Files in This Module

| File | Purpose |
|------|---------|
| `deployment-strategies.md` | Cloud vs edge vs hybrid, containerization, serverless agents |
| `ci-cd-pipelines.md` | CI/CD for AI apps — testing agents, versioning prompts, deploying models |
| `cloud-platforms.md` | AWS, GCP, Azure, Vercel, Railway, Fly.io — comparison for AI workloads |
| `kubernetes-for-agents.md` | K8s patterns for running agent workloads, GPU scheduling, autoscaling |
| `security-in-production.md` | API key management, rate limiting, input sanitization, output filtering |
| `observability-at-scale.md` | Harbor, Langfuse, Helicone, Datadog — production monitoring |
| `load-balancing.md` | Load balancing across model providers, request routing, queueing |
| `ai-sdlc.md` | The new software development lifecycle for AI-native products |
| `client-pitching.md` | How to pitch AI agent projects to clients — ROI, demos, scope |
| `compliance-and-governance.md` | SOC2, HIPAA, GDPR — compliance for AI systems |
| `cost-management.md` | Managing API costs at scale — budgets, alerts, optimization |
| `voice-and-realtime.md` | Pipecat, LiveKit, WebRTC — real-time voice/video agent systems |

## Key Frameworks & Tools

### Observability & Compliance
- **Harbor Framework** — Agent observability, guardrails, compliance (https://github.com/harbor-framework/harbor)
- **Langfuse** — Open-source LLM observability
- **Helicone** — API analytics and monitoring
- **Portkey** — AI gateway with observability

### Voice & Real-time
- **Pipecat** — Open-source framework for voice and multimodal AI (more extensible)
- **LiveKit** — Real-time communication infrastructure
- **Deepgram** — Speech-to-text API

### Deployment
- **Docker** — Containerization
- **Kubernetes** — Container orchestration
- **Vercel AI SDK** — Edge deployment for AI
- **Modal** — Serverless GPU compute
- **RunPod** — GPU cloud for inference

### CI/CD
- **GitHub Actions** — CI/CD pipelines
- **Braintrust** — Eval-driven deployment
- **Promptfoo** — Prompt testing framework
