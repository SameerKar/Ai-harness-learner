import yt_dlp
import re
from pathlib import Path
from typing import Optional, Callable
import sys

# Add parent to sys path so we can import config
sys.path.insert(0, str(Path(__file__).parent.parent))
import config

def sanitize_filename(name: str) -> str:
    """Remove characters that are invalid in Windows filenames."""
    sanitized = re.sub(r'[\\/*?:"<>|]', '_', name)
    sanitized = sanitized.strip('. ')
    return sanitized[:config.MAX_FILENAME_LENGTH]

def extract_audio(
    video: dict,
    output_dir: Optional[Path] = None,
    progress_callback: Optional[Callable] = None
) -> Optional[Path]:
    """Download and extract audio from a YouTube video."""
    output_dir = output_dir or config.AUDIO_DIR
    output_dir.mkdir(parents=True, exist_ok=True)
    
    safe_title = sanitize_filename(video['title'])
    video_id = video['video_id']
    outtmpl = str(output_dir / f"{safe_title} [{video_id}].%(ext)s")
    
    # Check if already extracted
    expected_file = output_dir / f"{safe_title} [{video_id}].{config.AUDIO_FORMAT}"
    if expected_file.exists():
        if progress_callback:
            progress_callback(100.0, "Already exists, skipping")
        return expected_file
    
    progress_hooks = []
    if progress_callback:
        def _hook(d):
            if d['status'] == 'downloading':
                total = d.get('total_bytes') or d.get('total_bytes_estimate') or 0
                downloaded = d.get('downloaded_bytes', 0)
                pct = (downloaded / total * 100) if total > 0 else 0
                progress_callback(pct, f"Downloading: {pct:.1f}%")
            elif d['status'] == 'finished':
                progress_callback(95.0, "Converting to audio...")
        progress_hooks.append(_hook)
    
    ydl_opts = {
        'format': 'bestaudio[ext=m4a]/bestaudio[ext=webm]/bestaudio',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': config.AUDIO_FORMAT,
            'preferredquality': config.AUDIO_QUALITY,
        }],
        'outtmpl': outtmpl,
        'quiet': True,
        'no_warnings': True,
        'ffmpeg_location': config.FFMPEG_LOCATION,
        'progress_hooks': progress_hooks,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video['url']])
        if progress_callback:
            progress_callback(100.0, "Audio extraction complete")
        return expected_file
    except Exception as e:
        if progress_callback:
            progress_callback(-1, f"Error: {str(e)}")
        return None
