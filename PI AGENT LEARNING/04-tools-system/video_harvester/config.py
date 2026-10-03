"""
YouTube Harvester Configuration
All paths are relative to the research-and-raw directory.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# === Base Paths ===
# The root of the research-and-raw workspace
RESEARCH_RAW_ROOT = Path(__file__).parent.parent.parent  # goes up from apps/youtube-harvester/ to research-and-raw/

# Media output directories
AUDIO_DIR = RESEARCH_RAW_ROOT / "raw-media" / "audio"
TRANSCRIPT_DIR = RESEARCH_RAW_ROOT / "raw-media" / "transcripts"
SCREENSHOT_DIR = RESEARCH_RAW_ROOT / "raw-media" / "screenshots"
METADATA_DIR = RESEARCH_RAW_ROOT / "raw-media" / "metadata"

# Resource catalogs
VIDEO_LINKS_JSON = RESEARCH_RAW_ROOT / "collected-resources" / "video-links" / "links.json"
GITHUB_REPOS_JSON = RESEARCH_RAW_ROOT / "collected-resources" / "github-repos" / "repos.json"

# === Audio Extraction Settings ===
AUDIO_FORMAT = "mp3"                # Output format: mp3, m4a, wav, opus
AUDIO_QUALITY = "192"               # Bitrate in kbps (128, 192, 256, 320)
AUDIO_POSTPROCESSOR = "ffmpeg"      # Must be "ffmpeg" — already installed on this system

# === Transcript Settings ===
TRANSCRIPT_LANGUAGES = ["en", "hi"]  # Priority order: English first, then Hindi
TRANSCRIPT_FORMATS = ["txt", "srt", "json"]  # Output formats to generate

# === Screenshot Settings ===
SCREENSHOT_ENABLED = False          # Off by default, user toggles on
SCREENSHOT_COUNT = 5                # Number of frames to capture per video
SCREENSHOT_SKIP_PERCENT = 5         # Skip first/last N% of video (avoid intros/outros)
SCREENSHOT_FORMAT = "jpg"           # Output format: jpg, png
SCREENSHOT_QUALITY = 85             # JPEG quality (1-100)

# === Server Settings ===
SERVER_HOST = "127.0.0.1"
SERVER_PORT = 8765

# === yt-dlp Settings ===
YTDLP_CONCURRENT_DOWNLOADS = 3     # Max parallel downloads
YTDLP_RATE_LIMIT = None             # Rate limit in bytes/sec, None = unlimited
YTDLP_COOKIES_FILE = None           # Path to cookies.txt if needed for age-restricted content

# === ffmpeg path ===
# ffmpeg 8.1.1 - yt-dlp's ffmpeg_location must point to the DIRECTORY containing ffmpeg.exe
FFMPEG_PATH = "ffmpeg"   # fallback for subprocess calls
FFMPEG_LOCATION = r"C:\Users\SAMEER\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin"

# === Filename Sanitization ===
MAX_FILENAME_LENGTH = 100           # Max characters in output filenames
