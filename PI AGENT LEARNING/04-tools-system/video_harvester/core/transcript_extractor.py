import json
import re
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
import config

import yt_dlp

# ── youtube-transcript-api v1.2.4: now instantiated, not static ──────────────
try:
    from youtube_transcript_api import YouTubeTranscriptApi
    _YT_TRANSCRIPT_AVAILABLE = True
except ImportError:
    _YT_TRANSCRIPT_AVAILABLE = False


def _seconds_to_srt_time(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"


def _vtt_to_items(vtt_path: Path) -> list[dict]:
    """Parse a WebVTT file into the standard [{text, start, duration}] list."""
    items = []
    text = vtt_path.read_text(encoding='utf-8', errors='replace')
    # Remove WEBVTT header block
    text = re.sub(r'^WEBVTT.*?\n\n', '', text, flags=re.DOTALL)
    # Split into cue blocks
    blocks = re.split(r'\n\n+', text.strip())
    for block in blocks:
        lines = block.strip().splitlines()
        # Find the timestamp line
        ts_line = next((l for l in lines if '-->' in l), None)
        if not ts_line:
            continue
        times = re.findall(r'(\d+:\d+[\d:.]+)', ts_line)
        if len(times) < 2:
            continue

        def ts_to_sec(ts: str) -> float:
            parts = ts.replace(',', '.').split(':')
            parts = [float(p) for p in parts]
            if len(parts) == 3:
                return parts[0] * 3600 + parts[1] * 60 + parts[2]
            return parts[0] * 60 + parts[1]

        start = ts_to_sec(times[0])
        end = ts_to_sec(times[1])
        # Text = lines after timestamp, strip VTT tags
        text_lines = [l for l in lines if '-->' not in l and not l.isdigit() and l.strip()]
        raw = ' '.join(text_lines)
        raw = re.sub(r'<[^>]+>', '', raw)  # strip <c>, <i>, etc.
        if raw.strip():
            items.append({'text': raw.strip(), 'start': start, 'duration': end - start})
    return items


def _write_outputs(items: list[dict], video_id: str, output_dir: Path, source: str) -> dict:
    """Write txt, srt, json from a list of transcript items."""
    expected_txt = output_dir / f"{video_id}.txt"
    expected_srt = output_dir / f"{video_id}.srt"
    expected_json = output_dir / f"{video_id}.json"

    with open(expected_json, 'w', encoding='utf-8') as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

    with open(expected_txt, 'w', encoding='utf-8') as f:
        for item in items:
            f.write(f"{item['text']}\n")

    with open(expected_srt, 'w', encoding='utf-8') as f:
        for i, item in enumerate(items, 1):
            start = item['start']
            end = start + item.get('duration', 2.0)
            f.write(f"{i}\n")
            f.write(f"{_seconds_to_srt_time(start)} --> {_seconds_to_srt_time(end)}\n")
            f.write(f"{item['text']}\n\n")

    return {
        'txt': expected_txt,
        'srt': expected_srt,
        'json': expected_json,
        'source': source,
        'language': None
    }


def extract_transcript(video: dict) -> dict:
    """Extract subtitles for a YouTube video in txt, srt, and json formats."""
    video_id = video['video_id']
    output_dir = config.TRANSCRIPT_DIR / video_id
    output_dir.mkdir(parents=True, exist_ok=True)

    empty_result = {'txt': None, 'srt': None, 'json': None, 'source': None, 'language': None}

    expected_txt = output_dir / f"{video_id}.txt"
    expected_srt = output_dir / f"{video_id}.srt"
    expected_json = output_dir / f"{video_id}.json"

    # Cache hit
    if expected_txt.exists() and expected_srt.exists() and expected_json.exists():
        return {**empty_result, 'txt': expected_txt, 'srt': expected_srt,
                'json': expected_json, 'source': 'cache'}

    # ── Approach 1: youtube-transcript-api v1.2.4 ────────────────────────────
    if _YT_TRANSCRIPT_AVAILABLE:
        try:
            api = YouTubeTranscriptApi()
            fetched = api.fetch(video_id, languages=config.TRANSCRIPT_LANGUAGES)
            items = fetched.to_raw_data()
            if items:
                return _write_outputs(items, video_id, output_dir, 'youtube_transcript_api')
        except Exception as e:
            print(f"  ! youtube-transcript-api failed for {video_id}: {type(e).__name__}: {e}. Trying yt-dlp...")

    # ── Approach 2: yt-dlp subtitle download + VTT parse ─────────────────────
    ydl_opts = {
        'skip_download': True,
        'writesubtitles': True,
        'writeautomaticsub': True,
        'subtitleslangs': ['en'],   # just English to avoid 429 on multiple langs
        'outtmpl': str(output_dir / f"{video_id}"),
        'quiet': True,
        'no_warnings': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video['url']])

        # Find the best VTT file (prefer non-.auto. first)
        vtt_files = sorted(output_dir.glob(f"{video_id}*.vtt"),
                           key=lambda p: (1 if '.auto.' in p.name else 0))
        if vtt_files:
            items = _vtt_to_items(vtt_files[0])
            if items:
                # Clean up vtt files after conversion
                for vf in output_dir.glob("*.vtt"):
                    vf.unlink(missing_ok=True)
                return _write_outputs(items, video_id, output_dir, 'yt_dlp_vtt')
    except Exception as e:
        print(f"  ! yt-dlp transcript fallback failed for {video_id}: {e}")

    print(f"  ! No transcript found for {video_id}")
    return empty_result
