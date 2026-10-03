import json
from datetime import datetime
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
import config

def save_metadata(video: dict, results: dict):
    """Save comprehensive JSON metadata for each processed video."""
    video_id = video['video_id']
    output_file = config.METADATA_DIR / f"{video_id}.json"
    
    config.METADATA_DIR.mkdir(parents=True, exist_ok=True)
    
    audio_data = results.get('audio')
    transcript_data = results.get('transcript') or {}
    screenshots_data = results.get('screenshots') or []
    
    # Path relative to research-and-raw
    def rel_path(p):
        try:
            return str(Path(p).relative_to(config.RESEARCH_RAW_ROOT)) if p else None
        except ValueError:
            return str(p) if p else None
            
    metadata = {
        "video_id": video_id,
        "title": video.get('title'),
        "url": video.get('url'),
        "channel": video.get('channel'),
        "channel_id": video.get('channel_id'),
        "duration": video.get('duration'),
        "upload_date": video.get('upload_date'),
        "description": video.get('description'),
        "thumbnail": video.get('thumbnail'),
        "extracted_at": datetime.utcnow().isoformat(),
        "extraction_results": {
            "audio": {
                "extracted": audio_data is not None,
                "path": rel_path(audio_data) if audio_data else None,
                "format": config.AUDIO_FORMAT,
                "quality": config.AUDIO_QUALITY
            },
            "transcript": {
                "extracted": transcript_data.get('txt') is not None,
                "source": transcript_data.get('source'),
                "language": transcript_data.get('language'),
                "paths": {
                    "txt": rel_path(transcript_data.get('txt')),
                    "srt": rel_path(transcript_data.get('srt')),
                    "json": rel_path(transcript_data.get('json'))
                }
            },
            "screenshots": {
                "extracted": len(screenshots_data) > 0,
                "count": len(screenshots_data),
                "paths": [rel_path(p) for p in screenshots_data]
            }
        }
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)
        
    return metadata
