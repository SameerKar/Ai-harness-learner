// === Configuration ===
const API_BASE = 'http://127.0.0.1:8765/api';

// === DOM References ===
const urlInput = document.getElementById('url-input');
const btnScan = document.getElementById('btn-scan');
const optAudio = document.getElementById('opt-audio');
const optTranscript = document.getElementById('opt-transcript');
const optScreenshots = document.getElementById('opt-screenshots');
const screenshotSliderWrap = document.getElementById('screenshot-slider-wrap');
const screenshotCount = document.getElementById('screenshot-count');
const screenshotCountLabel = document.getElementById('screenshot-count-label');
const optLimit = document.getElementById('opt-limit');

const optionsSection = document.getElementById('options-section');
const previewSection = document.getElementById('preview-section');
const previewTitle = document.getElementById('preview-title');
const previewCount = document.getElementById('preview-count');
const videoPreviewList = document.getElementById('video-preview-list');
const btnExtract = document.getElementById('btn-extract');
const btnOpenFolder = document.getElementById('btn-open-folder');

const progressSection = document.getElementById('progress-section');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const terminalLog = document.getElementById('terminal-log');

const resultsSection = document.getElementById('results-section');
const resultsSummary = document.getElementById('results-summary');
const resultsList = document.getElementById('results-list');

// === State ===
let currentVideos = [];
let currentTaskId = null;
let eventSource = null;
let processingVideoCount = 0;
let totalVideoCount = 0;

// === Event Listeners ===
btnScan.addEventListener('click', scanUrl);
btnExtract.addEventListener('click', startExtraction);
btnOpenFolder.addEventListener('click', openFolder);

optScreenshots.addEventListener('change', (e) => {
    screenshotSliderWrap.style.display = e.target.checked ? 'flex' : 'none';
});

screenshotCount.addEventListener('input', (e) => {
    screenshotCountLabel.textContent = `${e.target.value} frames`;
});

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') scanUrl();
});

// === Core Functions ===

async function scanUrl() {
    const url = urlInput.value.trim();
    if (!url) return;

    btnScan.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
    btnScan.disabled = true;
    
    // Hide previous sections
    optionsSection.style.display = 'none';
    previewSection.style.display = 'none';
    progressSection.style.display = 'none';
    resultsSection.style.display = 'none';

    try {
        const limitVal = parseInt(optLimit.value);
        const payload = { url: url, limit: isNaN(limitVal) ? null : limitVal };
        
        const res = await fetch(`${API_BASE}/extract/preview`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        currentVideos = data.videos;
        totalVideoCount = data.total;
        
        previewTitle.textContent = data.source_type === 'channel' ? 'Channel Videos Found' : 
                                  (data.source_type === 'playlist' ? 'Playlist Videos Found' : 'Video Found');
        previewCount.textContent = `${totalVideoCount} videos`;
        
        renderVideoPreview(currentVideos);
        
        optionsSection.style.display = 'block';
        previewSection.style.display = 'block';
        
    } catch (err) {
        alert("Failed to scan URL: " + err.message);
    } finally {
        btnScan.innerHTML = '<i class="fas fa-search"></i> Scan';
        btnScan.disabled = false;
    }
}

function renderVideoPreview(videos) {
    videoPreviewList.innerHTML = '';
    
    if (videos.length === 0) {
        videoPreviewList.innerHTML = '<div style="padding:1rem; color:var(--text-muted);">No videos found.</div>';
        return;
    }
    
    videos.forEach(v => {
        const html = `
            <div class="video-item fade-in">
                <img src="${v.thumbnail}" class="video-thumb" alt="thumbnail">
                <div class="video-info">
                    <h4>${v.title}</h4>
                    <div class="video-meta">
                        <span><i class="fas fa-user"></i> ${v.channel}</span> &nbsp;&bull;&nbsp;
                        <span><i class="fas fa-clock"></i> ${formatDuration(v.duration)}</span>
                    </div>
                </div>
            </div>
        `;
        videoPreviewList.insertAdjacentHTML('beforeend', html);
    });
}

async function startExtraction() {
    const url = urlInput.value.trim();
    if (!url) return;
    
    const limitVal = parseInt(optLimit.value);
    
    const options = {
        extract_audio: optAudio.checked,
        extract_transcripts: optTranscript.checked,
        extract_screenshots: optScreenshots.checked,
        screenshot_count: parseInt(screenshotCount.value),
        max_videos: isNaN(limitVal) ? null : limitVal
    };
    
    btnExtract.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Initializing...';
    btnExtract.disabled = true;
    
    try {
        const res = await fetch(`${API_BASE}/extract/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url, options: options })
        });
        
        if (!res.ok) throw new Error("Failed to start extraction");
        
        const data = await res.json();
        currentTaskId = data.task_id;
        
        // Setup UI
        progressSection.style.display = 'block';
        terminalLog.innerHTML = '';
        progressBar.style.width = '0%';
        processingVideoCount = 0;
        progressText.textContent = `0 / ${totalVideoCount} videos processed`;
        
        // Connect SSE
        connectSSE(currentTaskId);
        
    } catch (err) {
        alert("Error starting extraction: " + err.message);
        btnExtract.innerHTML = '<i class="fas fa-bolt"></i> Extract All';
        btnExtract.disabled = false;
    }
}

function connectSSE(taskId) {
    if (eventSource) {
        eventSource.close();
    }
    
    eventSource = new EventSource(`${API_BASE}/extract/stream/${taskId}`);
    
    eventSource.onmessage = (e) => {
        const data = JSON.parse(e.data);
        
        if (data.type === 'log') {
            appendLog(data.message, 'info');
        } else if (data.type === 'error') {
            appendLog(data.message, 'error');
        } else if (data.type === 'progress') {
            progressBar.style.width = `${data.percent}%`;
        } else if (data.type === 'video_complete') {
            processingVideoCount++;
            progressText.textContent = `${processingVideoCount} / ${totalVideoCount} videos processed`;
        } else if (data.type === 'complete') {
            eventSource.close();
            appendLog(`Finished in ${data.result.duration.toFixed(1)}s`, 'success');
            progressBar.style.width = '100%';
            btnExtract.innerHTML = '<i class="fas fa-check"></i> Complete';
            
            setTimeout(() => {
                showResults(data.result);
            }, 1000);
        }
    };
    
    eventSource.onerror = (err) => {
        appendLog("Lost connection to stream.", "error");
        eventSource.close();
    };
}

function appendLog(msg, type='info') {
    const line = document.createElement('div');
    line.className = `log-line log-${type}`;
    line.textContent = msg;
    terminalLog.appendChild(line);
    terminalLog.scrollTop = terminalLog.scrollHeight;
}

function showResults(resultData) {
    progressSection.style.display = 'none';
    resultsSection.style.display = 'block';
    
    resultsSummary.textContent = `Processed ${resultData.processed} videos successfully, ${resultData.failed} failed.`;
    
    // We don't have detailed file paths from the SSE stream 'complete' event in this simple version,
    // but we can let the user open the folder to see the results.
}

async function openFolder() {
    try {
        await fetch(`${API_BASE}/system/open-folder`, { method: 'POST' });
    } catch (e) {
        console.error("Failed to open folder", e);
    }
}

function formatDuration(seconds) {
    if (!seconds) return "Unknown";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
}
