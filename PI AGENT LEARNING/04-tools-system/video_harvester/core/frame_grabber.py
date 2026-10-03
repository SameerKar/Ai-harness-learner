import subprocess
from pathlib import Path
from typing import Optional
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
import config
import yt_dlp

def grab_frames(video: dict, count: int = None, skip_percent: float = None) -> list[Path]:
    """Capture N screenshots from distributed timestamps across a video's duration."""
    video_id = video['video_id']
    url = video['url']
    duration = video.get('duration')
    
    if not duration:
        print(f"Cannot grab frames for {video_id}: Unknown duration.")
        return []
        
    count = count if count is not None else config.SCREENSHOT_COUNT
    if count <= 0:
        return []
        
    skip_percent = skip_percent if skip_percent is not None else config.SCREENSHOT_SKIP_PERCENT
    output_dir = config.SCREENSHOT_DIR / video_id
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Check if we already have them
    existing_files = list(output_dir.glob(f"*.{config.SCREENSHOT_FORMAT}"))
    if len(existing_files) >= count:
        return existing_files
        
    # Calculate timestamps
    start_time = duration * (skip_percent / 100)
    end_time = duration * (1 - skip_percent / 100)
    usable_duration = end_time - start_time
    
    timestamps = []
    if count == 1:
        timestamps.append(start_time + usable_duration / 2)
    else:
        interval = usable_duration / (count - 1)
        for i in range(count):
            timestamps.append(start_time + (interval * i))
            
    # Try Approach A: get direct stream URL
    try:
        ydl_opts = {'format': 'best[height<=720][ext=mp4]/best[height<=720]', 'quiet': True,
                    'ffmpeg_location': config.FFMPEG_LOCATION}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            stream_url = info['url']
            
        saved_files = []
        for i, ts in enumerate(timestamps):
            out_file = output_dir / f"frame_{i:03d}_{int(ts)}s.{config.SCREENSHOT_FORMAT}"
            if out_file.exists():
                saved_files.append(out_file)
                continue
                
            cmd = [
                config.FFMPEG_PATH,
                '-ss', str(ts),
                '-i', stream_url,
                '-frames:v', '1',
                '-q:v', '2',
                str(out_file),
                '-y'
            ]
            
            subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
            if out_file.exists():
                saved_files.append(out_file)
                
        return saved_files
        
    except Exception as e:
        print(f"Failed to grab frames using stream URL for {video_id}: {e}")
        return []
