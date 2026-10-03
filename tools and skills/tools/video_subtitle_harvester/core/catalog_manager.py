import os
import json
from pathlib import Path

import sys
sys.path.insert(0, str(Path(__file__).parent.parent))
import config
from datetime import datetime

def load_video_catalog() -> dict:
    if not config.VIDEO_LINKS_JSON.exists():
        return {
            "lastUpdated": datetime.utcnow().isoformat()[:10],
            "totalLinks": 0,
            "collections": []
        }
    with open(config.VIDEO_LINKS_JSON, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_video_catalog(data: dict):
    config.VIDEO_LINKS_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(config.VIDEO_LINKS_JSON, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def add_collection(source_url: str, source_type: str, title: str, videos: list[dict], discovered_by='manual'):
    data = load_video_catalog()
    
    # Find existing collection
    collection = next((c for c in data['collections'] if c['sourceUrl'] == source_url), None)
    
    if not collection:
        collection = {
            "id": source_url.split('/')[-1] if '/' in source_url else source_url,
            "type": source_type,
            "sourceUrl": source_url,
            "title": title,
            "discoveredBy": discovered_by,
            "discoveredAt": datetime.utcnow().isoformat(),
            "videos": []
        }
        data['collections'].append(collection)
        
    collection['harvestStatus'] = 'completed'
    
    # Deduplicate videos
    existing_video_ids = {v['videoId'] for v in collection['videos']}
    
    for v in videos:
        if v['video_id'] not in existing_video_ids:
            collection['videos'].append({
                "videoId": v['video_id'],
                "title": v.get('title', ''),
                "url": v['url'],
                "duration": v.get('duration'),
                "uploadDate": v.get('upload_date'),
                "audioExtracted": True, # For now assuming true if in results
                "transcriptExtracted": True,
                "screenshotsExtracted": False,
                "topics": []
            })
            
    collection['totalVideos'] = len(collection['videos'])
    
    # Update totals
    data['totalLinks'] = sum(c['totalVideos'] for c in data['collections'])
    data['lastUpdated'] = datetime.utcnow().isoformat()[:10]
    
    save_video_catalog(data)

def load_repo_catalog() -> dict:
    if not config.GITHUB_REPOS_JSON.exists():
        return {
            "lastUpdated": datetime.utcnow().isoformat()[:10],
            "totalRepos": 0,
            "repos": []
        }
    with open(config.GITHUB_REPOS_JSON, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_repo_catalog(data: dict):
    config.GITHUB_REPOS_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(config.GITHUB_REPOS_JSON, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def add_repo(repo_data: dict, discovered_by='manual'):
    data = load_repo_catalog()
    
    existing = next((r for r in data['repos'] if r['githubUrl'] == repo_data['githubUrl']), None)
    if not existing:
        repo_data['discoveredBy'] = discovered_by
        repo_data['discoveredAt'] = datetime.utcnow().isoformat()
        if 'status' not in repo_data:
            repo_data['status'] = 'new'
        data['repos'].append(repo_data)
        
        data['totalRepos'] = len(data['repos'])
        data['lastUpdated'] = datetime.utcnow().isoformat()[:10]
        save_repo_catalog(data)
