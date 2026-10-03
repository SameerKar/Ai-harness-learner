import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional, Callable
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
import config
from .url_resolver import resolve_url
from .audio_extractor import extract_audio
from .transcript_extractor import extract_transcript
from .frame_grabber import grab_frames
from .metadata_saver import save_metadata
from .catalog_manager import add_collection
from .logger import log

@dataclass
class ExtractionOptions:
    extract_audio: bool = True
    extract_transcripts: bool = True
    extract_screenshots: bool = False
    screenshot_count: int = 5
    max_videos: Optional[int] = None
    skip_existing: bool = True
    delay_seconds: int = 0

@dataclass
class ExtractionResult:
    source_url: str
    source_type: str
    total_videos: int
    processed: int = 0
    skipped: int = 0
    failed: int = 0
    audio_files: list[Path] = field(default_factory=list)
    transcript_files: list[dict] = field(default_factory=list)
    screenshot_files: list[list[Path]] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)
    duration_seconds: float = 0.0

def extract_from_url(
    url: str, 
    options: ExtractionOptions,
    progress_callback: Optional[Callable[[dict], None]] = None
) -> ExtractionResult:
    """Main orchestration module to resolve, download, extract, and catalog a URL."""
    start_time = time.time()
    
    # Notify start
    if progress_callback:
        progress_callback({'type': 'log', 'message': f"Resolving URL: {url}"})
        progress_callback({'type': 'progress', 'percent': 0, 'status': "Resolving URL..."})

    try:
        videos = resolve_url(url, limit=options.max_videos)
    except Exception as e:
        msg = f"Failed to resolve URL: {e}"
        log.error(msg)
        if progress_callback:
            progress_callback({'type': 'error', 'message': msg})
        return ExtractionResult(source_url=url, source_type="unknown", total_videos=0, failed=1, errors=[msg])

    source_type = "video" if len(videos) == 1 and not ('playlist' in url or 'videos' in url) else ("playlist" if 'playlist' in url else "channel")
    total_vids = len(videos)
    
    result = ExtractionResult(
        source_url=url,
        source_type=source_type,
        total_videos=total_vids
    )

    if total_vids == 0:
        msg = "No videos found."
        log.warning(msg)
        if progress_callback:
            progress_callback({'type': 'log', 'message': msg})
        return result

    if progress_callback:
        progress_callback({'type': 'log', 'message': f"Found {total_vids} video(s)"})

    title = videos[0].get('channel') if source_type == 'channel' else (videos[0].get('title') if source_type == 'video' else 'Playlist Collection')

    for i, video in enumerate(videos):
        vid_id = video['video_id']
        vid_title = video.get('title', 'Unknown Title')
        
        if progress_callback:
            progress_callback({'type': 'log', 'message': f"\nProcessing ({i+1}/{total_vids}): {vid_title}"})
            progress_callback({'type': 'progress', 'percent': (i / total_vids) * 100, 'status': f"Processing {i+1}/{total_vids}"})

        vid_results = {}
        success = True

        # 1. Audio
        if options.extract_audio:
            if progress_callback:
                progress_callback({'type': 'log', 'message': "  - Extracting audio..."})
            
            def audio_cb(pct, stat):
                if progress_callback:
                    progress_callback({'type': 'progress', 'percent': (i / total_vids) * 100 + (pct / 100) * (100 / total_vids), 'status': f"Audio: {stat}"})
            
            audio_path = extract_audio(video, progress_callback=audio_cb)
            if audio_path:
                result.audio_files.append(audio_path)
                vid_results['audio'] = audio_path
                if progress_callback:
                    progress_callback({'type': 'log', 'message': f"    ✓ Audio saved"})
            else:
                success = False
                msg = f"Failed to extract audio for {vid_id}"
                result.errors.append(msg)
                if progress_callback:
                    progress_callback({'type': 'error', 'message': msg})

        # 2. Transcripts
        if options.extract_transcripts:
            if progress_callback:
                progress_callback({'type': 'log', 'message': "  - Extracting transcripts..."})
                progress_callback({'type': 'progress', 'percent': (i / total_vids) * 100, 'status': "Extracting transcripts..."})
                
            transcript_res = extract_transcript(video)
            vid_results['transcript'] = transcript_res
            if transcript_res.get('txt'):
                result.transcript_files.append(transcript_res)
                if progress_callback:
                    progress_callback({'type': 'log', 'message': f"    ✓ Transcript saved ({transcript_res.get('source')})"})
            else:
                if progress_callback:
                    progress_callback({'type': 'log', 'message': "    ⚠ No transcript found"})

        # 3. Screenshots
        if options.extract_screenshots:
            if progress_callback:
                progress_callback({'type': 'log', 'message': "  - Grabbing screenshots..."})
                progress_callback({'type': 'progress', 'percent': (i / total_vids) * 100, 'status': "Grabbing screenshots..."})
                
            frames = grab_frames(video, count=options.screenshot_count)
            vid_results['screenshots'] = frames
            if frames:
                result.screenshot_files.append(frames)
                if progress_callback:
                    progress_callback({'type': 'log', 'message': f"    ✓ Saved {len(frames)} screenshots"})
            else:
                if progress_callback:
                    progress_callback({'type': 'log', 'message': "    ⚠ No screenshots generated"})

        # Save metadata
        save_metadata(video, vid_results)
        
        if success:
            result.processed += 1
        else:
            result.failed += 1

        if progress_callback:
            progress_callback({'type': 'video_complete', 'video_id': vid_id})

        if options.delay_seconds > 0 and i < total_vids - 1:
            if progress_callback:
                progress_callback({'type': 'log', 'message': f"  - Sleeping for {options.delay_seconds}s..."})
            time.sleep(options.delay_seconds)

    # Catalog update
    if progress_callback:
        progress_callback({'type': 'log', 'message': "\nUpdating catalog (links.json)..."})
    add_collection(url, source_type, title, videos, discovered_by='manual')

    result.duration_seconds = time.time() - start_time
    
    if progress_callback:
        progress_callback({'type': 'log', 'message': f"Extraction complete in {result.duration_seconds:.1f}s"})
        progress_callback({'type': 'complete', 'result': {
            'processed': result.processed,
            'failed': result.failed,
            'duration': result.duration_seconds
        }})
        
    return result
