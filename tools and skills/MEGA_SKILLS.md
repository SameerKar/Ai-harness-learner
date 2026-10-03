# 🛠️ Mega Skills & Tools Index

> **Purpose:** Master index of all reusable tools and skills for building AI agent systems, harnesses, and projects.
> This file serves as the single entry point — any agent or human can read this to discover what's available.

---

## 📂 Directory Structure

```
tools and skills/
├── MEGA_SKILLS.md              ← THIS FILE — master index
├── tools/                      ← Reusable Python scripts, CLI tools, utilities
│   ├── video_subtitle_harvester/  ← Extract subtitles/transcripts from YouTube
│   ├── csv_query_search/          ← Search & filter CSV data (talks, speakers, topics)
│   ├── youtube_channel_extractor/ ← Extract all video links from a YouTube channel
│   └── [future tools...]
├── skills/                     ← Reusable skill files (SKILL.md pattern) for agents
│   └── [future skills...]
```

---

## 🔧 Tools Registry

### 1. `video_subtitle_harvester`
- **Location:** `tools/video_subtitle_harvester/`
- **Original Source:** `PI AGENT LEARNING/04-tools-system/video_harvester/`
- **What it does:** Extracts subtitles, transcripts, audio, and screenshots from YouTube videos/channels/playlists
- **Tech:** Python, yt-dlp, ffmpeg, youtube-transcript-api
- **Usage:** `python harvester.py <youtube_url> [--no-audio] [--no-transcripts] [--limit N]`
- **Outputs:** `.txt`, `.srt`, `.json` transcript files, `.mp3` audio, `.jpg` screenshots

### 2. `csv_query_search`
- **Location:** `tools/csv_query_search/`
- **What it does:** Python script to search, filter, and query CSV data files (AI Engineer talks, speakers, topics, transcripts)
- **Usage:** `python csv_search.py --query "agent harness" --file aie-talks.csv --field summary`
- **Use cases:** Find relevant talks, filter by topic/speaker/event, full-text search across transcripts

### 3. `youtube_channel_extractor`
- **Location:** `tools/youtube_channel_extractor/`
- **What it does:** Given a YouTube channel URL, extracts all video links, titles, and metadata
- **Usage:** `python channel_extractor.py <channel_url> --output links.json`

---

## 📚 Skills Registry

Skills follow the `SKILL.md` pattern and are agent-readable instruction sets.

| Skill | Purpose | Status |
|-------|---------|--------|
| (coming soon) | Research skill for enriching docs | 🟡 Planned |
| (coming soon) | RAG ingestion skill | 🟡 Planned |
| (coming soon) | Project scaffolding skill | 🟡 Planned |

---

## 🔮 Future Tools (Planned)

| Tool | Purpose | Priority |
|------|---------|----------|
| `memory_manager` | Store/retrieve/query persistent memory across sessions | P0 |
| `rag_local_indexer` | Index text data locally with embeddings for RAG queries | P0 |
| `github_repo_analyzer` | Clone and analyze open-source repos (structure, deps, license) | P1 |
| `benchmark_runner` | Run evaluation benchmarks on agent outputs | P1 |
| `model_cost_calculator` | Compare LLM costs across providers for given workloads | P1 |
| `transcript_to_notes` | Convert raw transcripts to structured learning notes | P1 |
| `web_scraper` | Extract and parse content from web pages | P2 |
| `pdf_extractor` | Extract text and structure from PDF research papers | P2 |

---

## 📖 How to Add a New Tool

1. Create a directory under `tools/` with a descriptive Python-style name: `snake_case`
2. Include a `README.md` explaining what the tool does
3. Include a `requirements.txt` if it has Python dependencies
4. Name the main script descriptively (e.g., `csv_search.py`, `harvester.py`)
5. Update this `MEGA_SKILLS.md` file with the new entry

## 📖 How to Add a New Skill

1. Create a directory under `skills/` with a descriptive name
2. Include a `SKILL.md` with YAML frontmatter and step-by-step instructions
3. Update this `MEGA_SKILLS.md` file with the new entry
