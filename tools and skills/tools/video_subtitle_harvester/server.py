import asyncio
import json
import subprocess
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

from core.extractor import extract_from_url, ExtractionOptions
from core.url_resolver import resolve_url
import config
from core.utils import generate_task_id

app = FastAPI(title="YouTube Harvester API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"]
)

# Active extraction tasks: task_id -> asyncio.Queue
active_tasks: dict[str, asyncio.Queue] = {}

class ExtractionOptionsModel(BaseModel):
    extract_audio: bool = True
    extract_transcripts: bool = True
    extract_screenshots: bool = False
    screenshot_count: int = 5
    max_videos: int | None = None
    skip_existing: bool = True

class PreviewRequest(BaseModel):
    url: str
    limit: int | None = None

class ExtractRequest(BaseModel):
    url: str
    options: ExtractionOptionsModel

@app.post("/api/extract/preview")
async def preview(req: PreviewRequest):
    try:
        videos = resolve_url(req.url, limit=req.limit)
        source_type = "video" if len(videos) == 1 and not ('playlist' in req.url or 'videos' in req.url) else ("playlist" if 'playlist' in req.url else "channel")
        return {
            "source_type": source_type,
            "total": len(videos),
            "videos": videos
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/extract/start")
async def start_extraction(req: ExtractRequest):
    task_id = generate_task_id()
    queue = asyncio.Queue()
    active_tasks[task_id] = queue
    
    opts = ExtractionOptions(
        extract_audio=req.options.extract_audio,
        extract_transcripts=req.options.extract_transcripts,
        extract_screenshots=req.options.extract_screenshots,
        screenshot_count=req.options.screenshot_count,
        max_videos=req.options.max_videos,
        skip_existing=req.options.skip_existing
    )
    
    def progress_callback(data: dict):
        # We need a synchronous queue put here because it's called from yt-dlp/ffmpeg sync code,
        # but asyncio.Queue requires await. So we use call_soon_threadsafe or a small wrapper.
        # For simplicity, we just use the event loop.
        try:
            loop = asyncio.get_event_loop()
            loop.call_soon_threadsafe(queue.put_nowait, json.dumps(data))
        except Exception:
            pass

    async def extract_task():
        # Run in threadpool
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, extract_from_url, req.url, opts, progress_callback)
        # We don't remove from active_tasks until SSE disconnects or finishes to allow polling
        
    asyncio.create_task(extract_task())
    return {"task_id": task_id}

@app.get("/api/extract/stream/{task_id}")
async def stream_progress(task_id: str):
    if task_id not in active_tasks:
        raise HTTPException(status_code=404, detail="Task not found")
        
    queue = active_tasks[task_id]
    
    async def event_generator():
        try:
            while True:
                data_str = await queue.get()
                yield {'data': data_str}
                data = json.loads(data_str)
                if data.get('type') == 'complete':
                    break
        finally:
            if task_id in active_tasks:
                del active_tasks[task_id]
                
    return EventSourceResponse(event_generator())

@app.get("/api/media/audio/{filename}")
async def serve_audio(filename: str):
    path = config.AUDIO_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path)

@app.get("/api/media/screenshots/{video_id}/{filename}")
async def serve_screenshots(video_id: str, filename: str):
    path = config.SCREENSHOT_DIR / video_id / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path)

@app.post("/api/system/open-folder")
async def open_folder():
    path = str(config.RESEARCH_RAW_ROOT / "raw-media")
    subprocess.Popen(f'explorer "{path}"')
    return {"status": "ok"}

# Mount static files
app.mount("/", StaticFiles(directory=str(Path(__file__).parent / "web"), html=True), name="web")
