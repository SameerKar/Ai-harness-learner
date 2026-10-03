# Research Agent Skill — PI Agent Harness Learning

> **Skill for any AI agent (including low-reasoning models) to systematically research and enrich the learning documents in this repository.**

---

## Purpose

This skill tells a research agent how to take any **stub file** in the `PI AGENT LEARNING` folder and turn it into a fully enriched, deeply researched document — using web search, repo analysis, and documentation reading.

## When to Use

Use this skill whenever you are asked to:
- "Research" or "enrich" any `.md` file in the learning repository
- "Fill in" a stub document
- "Deep dive" on any harness subsystem topic

---

## Step-by-Step Research Process

### Step 1 — Read the stub file

Open the target file. Every stub contains:
- A **title** and **topic description**
- A **status** (⬜ Not started)
- A **priority** (P0/P1/P2)
- **Question numbers** it must answer (from `questions.md`)
- A **list of topics** to cover

Read all of this carefully. These are your research objectives.

### Step 2 — Read the relevant questions

Open `questions.md` and find the exact question numbers referenced by the stub. Copy them into your working context. These questions are your **acceptance criteria** — the enriched document must answer every one of them.

### Step 3 — Read existing research first

Before doing ANY web search, read these files for existing knowledge:
- `Research1.md` — Architecture deep-dive, memory systems, Gauntlet Loop
- `Research2.md` — 7-harness comparative teardown with code citations
- `00-foundations/glossary.md` — Standard terminology

Extract anything already known about your topic. Do NOT repeat what's already written — reference it with links like `(see [Research1](../Research1.md))`.

### Step 4 — Web research

Search the web for each question/topic. Use these search strategies:

#### For harness teardowns (01-teardowns/):
```
Search: "[harness name] GitHub repository architecture"
Search: "[harness name] agent loop source code"
Search: "[harness name] plugin extension API documentation"
Search: "[harness name] tool registration how it works"
Search: "[harness name] session management"
Search: "[harness name] memory system"
Search: "[harness name] permission security sandbox"
Search: "site:github.com [org]/[repo] docs"
Search: "site:reddit.com [harness name] review experience"
```

#### For architecture topics (02-16):
```
Search: "AI agent [topic] architecture design 2025 2026"
Search: "AI agent harness [topic] best practices"
Search: "[specific system name] documentation guide"
Search: "site:github.com [relevant repo] [topic]"
Search: "[topic] comparison benchmark"
```

#### For tools/libraries (14-open-source-tools/):
```
Search: "[tool name] GitHub license"
Search: "[tool name] vs [alternative] comparison"
Search: "[tool name] integration AI agent"
Search: "[tool name] API documentation getting started"
```

### Step 5 — Write the enriched document

Replace the stub content with a fully enriched document. Follow this **mandatory template**:

```markdown
# [Topic Name]

> **Status:** ✅ Researched
> **Priority:** [keep original]
> **Questions addressed:** [keep original]
> **Last updated:** [today's date]

---

## What This Is

One clear paragraph explaining the concept. A non-expert should understand 
what this is after reading this paragraph.

## Why It Matters for Harness Design

2-3 paragraphs connecting this directly to building commercial agent harnesses.
Why does this subsystem exist? What fails without it? What competitive 
advantage does doing it well provide?

## How It Works — Technical Deep-Dive

The main section. Include:
- Architecture diagrams (using ASCII art or mermaid)
- Code examples where relevant (real code from repos, not pseudocode)
- Data flow descriptions
- State diagrams for state machines
- Schema definitions for data structures

Be thorough. This is a LEARNING document. Explain things clearly.

## How Existing Harnesses Do It

| Harness | Approach | Key Details | Source |
|---------|----------|-------------|--------|
| Pi | ... | ... | [link] |
| Claude Code | ... | ... | [link] |
| Hermes | ... | ... | [link] |
| Codex | ... | ... | [link] |
| OpenCode | ... | ... | [link] |
| Goose | ... | ... | [link] |
| Cline | ... | ... | [link] |

Not all harnesses will be relevant to every topic. Include only those 
that have meaningful implementations.

## Design Decisions for Our Harness

Based on the research:
- **ADOPT:** What patterns should we use directly?
- **ADAPT:** What patterns need modification for our use case?
- **AVOID:** What approaches should we reject, and why?

Include tradeoff analysis. No decision without justification.

## Answered Questions

Go through each question number from the stub and write a clear answer:

### Q[number]: [question text]
**Answer:** [evidence-based answer with source citations]

## Key Takeaways

- Bullet-point summary of the 5-10 most important findings
- Each takeaway should be actionable

## References

- [descriptive name](URL) — brief note on what this source contains
- All GitHub repos with exact file paths where possible
- All documentation pages
- All papers with arXiv links
```

### Step 6 — Update cross-references

After writing the document:
1. Add any new terms to `00-foundations/glossary.md`
2. Add any key insights to `notes/insights.md`
3. Add any new pitfalls to `notes/gotchas.md`
4. Add any useful URLs to `notes/bookmarks.md`
5. Add any unresolved questions to `notes/open-questions.md`

### Step 7 — Update README status

In `README.md`, change the module status from ⬜ to ✅ once all files in that module are enriched.

---

## Quality Checklist

Before considering a document "done," verify:

- [ ] Every question from the stub is explicitly answered
- [ ] At least 3 harnesses are compared (where applicable)
- [ ] At least 1 architecture diagram is included
- [ ] All claims have source citations (URLs)
- [ ] Tradeoffs are discussed, not just "best practice"
- [ ] Document uses relative links to other learning modules
- [ ] New terms are added to the glossary
- [ ] Key insights are logged in notes/insights.md
- [ ] Licensing implications noted (if tools/libraries discussed)

---

## Important Rules

1. **Never fabricate sources.** If you cannot find information, write "NOT FOUND — requires manual investigation" and add to `notes/open-questions.md`.
2. **Always cite with URLs.** Every factual claim needs a link.
3. **Prefer primary sources.** GitHub repos and official docs > blog posts > Reddit.
4. **Note license for every tool.** If a tool is mentioned, its license must appear. AGPL is dangerous for commercial use.
5. **Use relative links.** Link to other learning documents with `../folder/file.md` syntax.
6. **Don't duplicate Research1/Research2.** Reference them, don't copy.
7. **Keep it practical.** This is for BUILDING harnesses, not academic review.
