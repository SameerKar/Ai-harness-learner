# LLM Routing, Orchestration & Model Selection

> Status: ⬜ Not started
> Priority: P0
> Last updated: 2026-10-03

## Why This Module Exists

Building agent harnesses isn't just about the harness code — it's fundamentally about choosing **which models to route which tasks to**. A coding task needs a different model than a vision task, audio task, or deep research task. Cost optimization, capability matching, and fallback strategies are critical for commercial viability.

## Files in This Module

| File | Purpose |
|------|---------|
| `model-catalog.md` | Complete catalog of available models — capabilities, context windows, pricing, strengths |
| `routing-strategies.md` | How to decide which model handles which task (rules-based, classifier-based, LLM-as-judge) |
| `capability-matrix.md` | Vision, audio, code, reasoning, multimodal — which models support what |
| `cost-optimization.md` | Optimal cost strategies — when to use cheap vs expensive models |
| `fallback-chains.md` | What happens when a model fails? Fallback hierarchies and retry logic |
| `fine-tuning-and-lora.md` | When and how to fine-tune: LoRA, QLoRA, full fine-tuning, embedding models |
| `embedding-models.md` | Comparison of embedding models for RAG, search, classification |
| `open-weight-models.md` | Llama, Mistral, Qwen, DeepSeek, Gemma — deployment, licensing, performance |
| `benchmarks-and-comparisons.md` | MMLU, HumanEval, MATH, coding benchmarks — how to read and use them |
| `multimodal-routing.md` | Handling vision + audio + code in the same agent — model composition |

## Key Questions

- Which model for coding? (Claude Sonnet, GPT-4o, DeepSeek-Coder, Codestral)
- Which model for vision? (GPT-4o, Claude, Gemini Pro Vision, Qwen-VL)
- Which model for audio? (Whisper, Gemini, specialized ASR)
- Which model for deep research? (Claude Opus, o1, Gemini 2.5 Pro)
- Which model for embeddings? (text-embedding-3-large, Cohere embed, open-source BGE)
- Which model for judging/evaluation? (LLM-as-judge patterns)
- Which model for structured output? (JSON mode reliability across providers)
- How to handle model routing at runtime? (LiteLLM, OpenRouter, custom router)
- How to optimize cost while maintaining quality? (cascade patterns)
- When to fine-tune vs prompt-engineer vs use a different model?
