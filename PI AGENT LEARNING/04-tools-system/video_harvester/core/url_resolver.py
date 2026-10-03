import yt_dlp
import re
from typing import Optional

def resolve_url(url: str, limit: Optional[int] = None) -> list[dict]:
    """Resolve a YouTube URL to a list of video metadata dicts."""
    ydl_opts = {
        'extract_flat': True,
        'quiet': True,
        'no_warnings': True,
        'ignoreerrors': True,
    }
    
    # Normalize channel URLs to /videos
    if re.match(r'https?://(www\.)?youtube\.com/(@[\w-]+|c/[\w-]+|channel/[\w-]+)/?$', url):
        url = url.rstrip('/') + '/videos'
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
    
    if info is None:
        raise ValueError(f"Could not extract info from URL: {url}")
    
    # Single video
    if 'entries' not in info:
        videos = [_normalize_entry(info)]
    else:
        videos = [_normalize_entry(e) for e in info['entries'] if e is not None]
    
    if limit:
        videos = videos[:limit]
    
    return videos

def _normalize_entry(entry: dict) -> dict:
    """Normalize a yt-dlp entry to our standard schema."""
    video_id = entry.get('id', '')
    return {
        'video_id': video_id,
        'title': entry.get('title', 'Unknown'),
        'url': f"https://www.youtube.com/watch?v={video_id}",
        'duration': entry.get('duration'),
        'upload_date': entry.get('upload_date'),
        'description': entry.get('description', ''),
        'channel': entry.get('channel', entry.get('uploader', 'Unknown')),
        'channel_id': entry.get('channel_id', ''),
        'thumbnail': entry.get('thumbnail', entry.get('thumbnails', [{}])[-1].get('url', '')),
        'view_count': entry.get('view_count'),
        'tags': entry.get('tags', []),
    }
