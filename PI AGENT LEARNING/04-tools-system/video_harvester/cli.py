import argparse
import sys

# Force UTF-8 output on Windows terminals (avoids cp1252 UnicodeEncodeError)
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

from core.extractor import extract_from_url, ExtractionOptions
from core.logger import log

def progress_cb(data):
    if data['type'] == 'log':
        if data['message'].startswith('  -'):
            print(f"    {data['message']}")
        else:
            print(f"[*] {data['message']}")
    elif data['type'] == 'error':
        print(f"[!] ERROR: {data['message']}")

def main():
    parser = argparse.ArgumentParser(description="YouTube Harvester CLI")
    parser.add_argument("url", help="YouTube Channel, Playlist, or Video URL")
    parser.add_argument("--no-audio", action="store_true", help="Skip audio extraction")
    parser.add_argument("--no-transcripts", action="store_true", help="Skip transcript extraction")
    parser.add_argument("--screenshots", action="store_true", help="Enable screenshot extraction")
    parser.add_argument("--frames", type=int, default=5, help="Number of frames for screenshots")
    parser.add_argument("--limit", type=int, default=None, help="Max videos to process")
    
    args = parser.parse_args()
    
    opts = ExtractionOptions(
        extract_audio=not args.no_audio,
        extract_transcripts=not args.no_transcripts,
        extract_screenshots=args.screenshots,
        screenshot_count=args.frames,
        max_videos=args.limit
    )
    
    print("=========================================")
    print(" YouTube Harvester CLI")
    print("=========================================")
    
    result = extract_from_url(args.url, opts, progress_cb)
    
    print("\n=========================================")
    print(" Summary")
    print(f" Source: {result.source_url}")
    print(f" Processed: {result.processed}/{result.total_videos}")
    print(f" Failed: {result.failed}")
    print(f" Errors: {len(result.errors)}")
    print("=========================================")
    
    if result.failed > 0:
        sys.exit(1)
        
if __name__ == "__main__":
    main()
