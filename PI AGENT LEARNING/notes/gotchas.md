# Gotchas — Pitfalls & Things to Avoid

> Traps other harness builders fell into. Learn from their mistakes.

---

## Security Gotchas

- **Pi has NO built-in permission system.** Runs as the user by default. If you build on Pi patterns, you MUST add your own security layer.
- **"Prompt-based safety" is not safety.** Models routinely bypass system prompt restrictions. Security must be code-enforced.
- **Firecrawl AGPL trap.** The server is AGPL-3.0, but SDKs are MIT. Using the server in SaaS requires open-sourcing your code.
- **Symlinks bypass path restrictions.** An agent can create symlinks to escape workspace boundaries unless you resolve real paths.

## Architecture Gotchas

- **Monolithic prompts cause context rot.** Stuffing everything into one system prompt degrades quality over time.
- **Agent self-evaluation always lies.** Agents declare victory on broken code. Use blind critics (Gauntlet Loop).
- **Not all tools need to be in every session.** Loading 70 tools into context wastes tokens and confuses the model.

## Memory Gotchas

- **Verbatim conversation storage doesn't scale.** MemPalace-style exact recall fails at scale. Extract structured facts instead (Hindsight approach).
- **New facts shouldn't just overwrite old ones.** Need veracity scoring and conflict resolution (Bayesian confidence).

## Licensing Gotchas

- **Claude Code is proprietary.** Cannot embed or resell. Inspiration only.
- **AGPL dependencies are viral.** Check every transitive dependency's license.
- **"Open source" doesn't mean "commercial use OK."** Always check the specific license terms.

---

*Add new entries as you discover more pitfalls.*
