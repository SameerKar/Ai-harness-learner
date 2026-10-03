const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = ['node_modules', '.git', 'scratch', 'artifacts'];

function walkDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file) && !file.startsWith('.')) {
                walkDir(filePath, fileList);
            }
        } else if (file.endsWith('.md')) {
            const relativePath = path.relative(__dirname, filePath);
            const content = fs.readFileSync(filePath, 'utf-8');
            fileList.push({
                path: relativePath.replace(/\\/g, '/'),
                name: file,
                content: content
            });
        }
    }
    return fileList;
}

const files = walkDir(__dirname);
files.sort((a, b) => a.path.localeCompare(b.path));
const escapedFiles = JSON.stringify(files).replace(/</g, '\\u003c');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PI Agent — Learning Hub</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0a0f;
  --bg2: #111118;
  --bg3: #16161f;
  --border: #1e1e2e;
  --border2: #2a2a3d;
  --text: #c9cad6;
  --text2: #8384a0;
  --text3: #505070;
  --accent: #6366f1;
  --accent2: #818cf8;
  --accent-glow: rgba(99,102,241,0.15);
  --green: #22c55e;
  --yellow: #eab308;
  --red: #ef4444;
  --sidebar-w: 280px;
  --toc-w: 240px;
}

html, body { height: 100%; overflow: hidden; background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; font-size: 14px; -webkit-font-smoothing: antialiased; }

/* ── LAYOUT ── */
.app { display: flex; height: 100vh; }

/* ── SIDEBAR ── */
.sidebar {
  width: var(--sidebar-w);
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg2);
  border-right: 1px solid var(--border);
  overflow: hidden;
}

.sidebar-header {
  padding: 20px 16px 14px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.logo-icon {
  width: 32px; height: 32px;
  background: linear-gradient(135deg, var(--accent), #a855f7);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
  box-shadow: 0 0 16px var(--accent-glow);
}

.logo-text h1 { font-size: 14px; font-weight: 600; color: #e2e3f0; letter-spacing: -0.02em; }
.logo-text p { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 1px; }

.search-wrap { position: relative; }
.search-wrap input {
  width: 100%;
  background: var(--bg3);
  border: 1px solid var(--border2);
  border-radius: 8px;
  padding: 8px 12px 8px 34px;
  color: var(--text);
  font-size: 12.5px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-wrap input::placeholder { color: var(--text3); }
.search-wrap input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
.search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text3); font-size: 13px; pointer-events: none; }

.sidebar-tree { flex: 1; overflow-y: auto; padding: 8px 8px; }

/* scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #3a3a5c; }

/* tree items */
.folder-group { margin-bottom: 2px; }

.folder-btn {
  display: flex; align-items: center; gap: 6px;
  width: 100%; padding: 6px 8px;
  background: none; border: none; cursor: pointer;
  color: var(--text3); font-size: 10.5px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
  text-align: left;
  font-family: inherit;
}
.folder-btn:hover { background: rgba(255,255,255,0.04); color: var(--text2); }
.folder-btn .chevron { margin-left: auto; transition: transform 0.2s; font-size: 11px; }
.folder-btn.open .chevron { transform: rotate(90deg); }

.folder-children { display: none; margin-bottom: 4px; }
.folder-children.open { display: block; }

.file-item {
  display: flex; align-items: center; gap: 7px;
  padding: 6px 8px 6px 20px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text2);
  font-size: 12.5px;
  border: 1px solid transparent;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  margin-bottom: 1px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  position: relative;
}
.file-item:hover { background: rgba(255,255,255,0.04); color: var(--text); }
.file-item.active {
  background: var(--accent-glow);
  border-color: rgba(99,102,241,0.3);
  color: var(--accent2);
  box-shadow: inset 3px 0 0 var(--accent);
}
.file-item .file-icon { color: var(--text3); font-size: 11px; flex-shrink: 0; }
.file-item.active .file-icon { color: var(--accent); }

/* root files */
.root-file { padding-left: 8px; }

.status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-left: auto; }
.dot-done { background: var(--green); box-shadow: 0 0 6px rgba(34,197,94,0.5); }
.dot-wip { background: var(--yellow); box-shadow: 0 0 6px rgba(234,179,8,0.4); }
.dot-todo { background: var(--text3); }

/* ── MAIN ── */
.main { flex: 1; display: flex; flex-direction: column; min-width: 0; height: 100%; overflow: hidden; }

.topbar {
  height: 48px; flex-shrink: 0;
  display: flex; align-items: center;
  padding: 0 24px;
  background: rgba(10,10,15,0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  gap: 8px;
  position: relative;
}
.progress-bar { position: absolute; bottom: 0; left: 0; height: 2px; background: var(--accent); width: 0%; transition: width 0.1s ease; box-shadow: 0 0 8px var(--accent); }

.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--text3); }
.breadcrumb .crumb { color: var(--text2); }
.breadcrumb .crumb-last { color: var(--text); font-weight: 500; }
.breadcrumb .sep { color: var(--text3); }

.topbar-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; }
.file-count { font-size: 11px; color: var(--text3); background: var(--bg3); border: 1px solid var(--border2); border-radius: 4px; padding: 2px 8px; }

/* content area */
.content-wrap { flex: 1; overflow: hidden; display: flex; }
.content-scroll { flex: 1; overflow-y: auto; }
.content-inner { max-width: 820px; margin: 0 auto; padding: 40px 40px 80px; }

/* empty state */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100%; min-height: 60vh;
  color: var(--text3); gap: 12px;
}
.empty-icon { font-size: 48px; opacity: 0.3; }
.empty-state p { font-size: 13px; }
.empty-state .hint { font-size: 11px; color: var(--text3); opacity: 0.6; }

/* ── MARKDOWN STYLES ── */
.md h1 { font-size: 26px; font-weight: 700; color: #eeeef5; letter-spacing: -0.03em; margin: 0 0 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border); line-height: 1.2; }
.md h2 { font-size: 18px; font-weight: 600; color: #d4d5e8; letter-spacing: -0.02em; margin: 36px 0 12px; }
.md h3 { font-size: 15px; font-weight: 600; color: #bbbcda; margin: 24px 0 8px; }
.md h4 { font-size: 13px; font-weight: 600; color: var(--text2); margin: 16px 0 6px; text-transform: uppercase; letter-spacing: 0.05em; }
.md p { color: var(--text); line-height: 1.75; margin: 0 0 14px; font-size: 14.5px; }
.md a { color: var(--accent2); text-decoration: none; border-bottom: 1px solid rgba(129,140,248,0.3); transition: border-color 0.15s; }
.md a:hover { border-bottom-color: var(--accent2); }
.md strong { color: #e2e3f0; font-weight: 600; }
.md em { color: var(--text2); font-style: italic; }

.md blockquote {
  border-left: 3px solid var(--accent);
  margin: 20px 0;
  padding: 12px 20px;
  background: var(--accent-glow);
  border-radius: 0 8px 8px 0;
  color: var(--text2);
  font-size: 14px;
  line-height: 1.7;
}
.md blockquote p { color: var(--text2); margin: 0; }
.md blockquote strong { color: var(--accent2); }

.md ul, .md ol { padding-left: 20px; margin: 0 0 14px; }
.md li { color: var(--text); line-height: 1.7; margin-bottom: 4px; font-size: 14.5px; }
.md li::marker { color: var(--accent); }

.md code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  background: var(--bg3);
  color: #f472b6;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--border2);
}

.md pre {
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border2);
  background: #0d0d14;
  position: relative;
}
.md pre .lang-label {
  position: absolute; top: 0; right: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--text3); padding: 6px 12px;
  background: var(--bg3); border-bottom: 1px solid var(--border2); border-left: 1px solid var(--border2);
  border-radius: 0 10px 0 6px;
}
.md pre code {
  display: block; overflow-x: auto;
  padding: 36px 20px 20px;
  background: transparent; color: var(--text);
  border: none; font-size: 13px; line-height: 1.65;
}
.md pre .copy-btn {
  position: absolute; top: 4px; left: 12px;
  background: none; border: none; cursor: pointer;
  color: var(--text3); font-size: 10px; padding: 2px 6px;
  border-radius: 4px; transition: color 0.15s, background 0.15s;
  font-family: inherit;
}
.md pre .copy-btn:hover { color: var(--text); background: rgba(255,255,255,0.06); }

.md table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13.5px; }
.md th { background: var(--bg3); color: var(--text2); font-weight: 600; padding: 10px 14px; text-align: left; border-bottom: 2px solid var(--border2); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
.md td { padding: 9px 14px; border-bottom: 1px solid var(--border); color: var(--text); }
.md tr:hover td { background: rgba(255,255,255,0.02); }

.md hr { border: none; border-top: 1px solid var(--border); margin: 32px 0; }

/* ── TOC ── */
.toc-panel {
  width: var(--toc-w);
  flex-shrink: 0;
  padding: 36px 0 36px 0;
  overflow-y: auto;
  border-left: 1px solid var(--border);
  display: none;
}
@media (min-width: 1300px) { .toc-panel { display: block; } }
.toc-inner { padding: 0 20px; }
.toc-title { font-size: 10px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
.toc-link { display: block; font-size: 12px; color: var(--text3); text-decoration: none; padding: 4px 0; line-height: 1.4; border-left: 2px solid transparent; padding-left: 10px; transition: color 0.15s, border-color 0.15s; margin-bottom: 2px; }
.toc-link:hover { color: var(--text2); }
.toc-link.active { color: var(--accent2); border-left-color: var(--accent); }
.toc-h2 { padding-left: 10px; }
.toc-h3 { padding-left: 22px; font-size: 11.5px; }

</style>
</head>
<body>
<div class="app">

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-icon">🧠</div>
        <div class="logo-text">
          <h1>PI Agent</h1>
          <p>Learning Repository</p>
        </div>
      </div>
      <div class="search-wrap">
        <span class="search-icon">⌕</span>
        <input type="text" id="search" placeholder="Search files..." autocomplete="off">
      </div>
    </div>
    <div class="sidebar-tree" id="tree"></div>
  </aside>

  <!-- MAIN -->
  <div class="main">
    <div class="topbar">
      <div class="breadcrumb" id="breadcrumb">
        <span style="color:var(--text3)">Select a file to begin</span>
      </div>
      <div class="topbar-actions">
        <span class="file-count" id="file-count"></span>
      </div>
      <div class="progress-bar" id="progress"></div>
    </div>
    <div class="content-wrap">
      <div class="content-scroll" id="scroll">
        <div class="content-inner">
          <div class="empty-state" id="empty">
            <div class="empty-icon">📂</div>
            <p>Select a markdown document from the sidebar</p>
            <span class="hint">27 files across 18 learning modules</span>
          </div>
          <article class="md" id="content" style="display:none"></article>
        </div>
      </div>
      <div class="toc-panel" id="toc-panel">
        <div class="toc-inner">
          <div class="toc-title">📋 On this page</div>
          <nav id="toc"></nav>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
const FILES = ${escapedFiles};

// ── STATUS DETECTION ──
function getStatus(file) {
  const c = file.content;
  if (c.includes('✅') || c.includes('Status: ✅') || c.includes('Status:** ✅')) return 'done';
  if (c.includes('🟡') || c.includes('In progress')) return 'wip';
  return 'todo';
}

// ── BUILD TREE ──
const treeEl = document.getElementById('tree');
const fileMap = {};
FILES.forEach(f => fileMap[f.path] = f);

function buildTree(filter = '') {
  const folders = {};
  const roots = [];

  FILES.forEach(f => {
    const parts = f.path.split('/');
    if (parts.length === 1) {
      if (!filter || f.name.toLowerCase().includes(filter)) roots.push(f);
    } else {
      const folder = parts[0];
      if (!folders[folder]) folders[folder] = [];
      if (!filter || f.path.toLowerCase().includes(filter)) folders[folder].push(f);
    }
  });

  treeEl.innerHTML = '';

  // Folders
  Object.keys(folders).sort().forEach(folder => {
    const items = folders[folder];
    if (!items.length) return;

    const group = document.createElement('div');
    group.className = 'folder-group';

    const btn = document.createElement('button');
    btn.className = 'folder-btn' + (filter ? ' open' : '');
    const label = folder.replace(/^\\d+-/, '').replace(/-/g, ' ');
    btn.innerHTML = \`<span>📁 \${label}</span><span class="chevron">›</span>\`;
    btn.onclick = () => {
      btn.classList.toggle('open');
      children.classList.toggle('open');
    };

    const children = document.createElement('div');
    children.className = 'folder-children' + (filter ? ' open' : '');

    items.forEach(f => {
      children.appendChild(makeFileItem(f, false));
    });

    group.appendChild(btn);
    group.appendChild(children);
    treeEl.appendChild(group);
  });

  // Root files
  if (roots.length) {
    const sep = document.createElement('div');
    sep.style.cssText = 'height:1px;background:var(--border);margin:8px 4px;';
    treeEl.appendChild(sep);
    roots.forEach(f => treeEl.appendChild(makeFileItem(f, true)));
  }
}

function makeFileItem(f, isRoot) {
  const div = document.createElement('div');
  div.className = 'file-item' + (isRoot ? ' root-file' : '');
  div.dataset.path = f.path;
  const status = getStatus(f);
  const dotClass = status === 'done' ? 'dot-done' : status === 'wip' ? 'dot-wip' : 'dot-todo';
  div.innerHTML = \`<span class="file-icon">📄</span><span style="flex:1;overflow:hidden;text-overflow:ellipsis">\${f.name}</span><span class="status-dot \${dotClass}"></span>\`;
  div.onclick = () => loadFile(f.path);
  return div;
}

buildTree();

document.getElementById('search').addEventListener('input', e => {
  buildTree(e.target.value.toLowerCase().trim());
});

// ── LOAD FILE ──
let currentPath = null;

function loadFile(p) {
  const f = fileMap[p];
  if (!f) return;
  currentPath = p;

  // Sidebar active state
  document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
  const el = document.querySelector(\`.file-item[data-path="\${p}"]\`);
  if (el) {
    el.classList.add('active');
    el.scrollIntoView({ block: 'nearest' });
    // Open parent folder if needed
    const parent = el.closest('.folder-children');
    if (parent && !parent.classList.contains('open')) {
      parent.classList.add('open');
      parent.previousElementSibling?.classList.add('open');
    }
  }

  // Breadcrumb
  const parts = p.split('/');
  const bc = document.getElementById('breadcrumb');
  if (parts.length === 1) {
    bc.innerHTML = \`<span class="crumb-last">\${parts[0]}</span>\`;
  } else {
    bc.innerHTML = parts.map((part, i) =>
      i < parts.length - 1
        ? \`<span class="crumb">\${part}</span><span class="sep">›</span>\`
        : \`<span class="crumb-last">\${part}</span>\`
    ).join('');
  }

  // File count
  document.getElementById('file-count').textContent = \`\${FILES.length} files\`;

  // Render markdown
  const html = renderMarkdown(f.content);
  const contentEl = document.getElementById('content');
  document.getElementById('empty').style.display = 'none';
  contentEl.style.display = 'block';
  contentEl.innerHTML = html;

  // Syntax highlight
  contentEl.querySelectorAll('pre code').forEach(block => {
    try { hljs.highlightElement(block); } catch(e) {}
  });

  // Copy buttons
  contentEl.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'copy';
    btn.onclick = () => {
      const code = pre.querySelector('code');
      navigator.clipboard.writeText(code ? code.innerText : pre.innerText).then(() => {
        btn.textContent = '✓ copied';
        setTimeout(() => { btn.textContent = 'copy'; }, 2000);
      });
    };
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });

  // Build ToC
  buildToC(contentEl);

  // Scroll to top
  document.getElementById('scroll').scrollTo({ top: 0, behavior: 'instant' });
}

function renderMarkdown(md) {
  const renderer = new marked.Renderer();

  renderer.code = function({ text, lang }) {
    const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const langLabel = lang ? \`<span class="lang-label">\${lang}</span>\` : '';
    return \`<pre>\${langLabel}<code class="\${lang ? 'language-'+lang : ''}">\${escaped}</code></pre>\`;
  };

  renderer.link = function({ href, text }) {
    if (href && href.endsWith('.md') && !href.startsWith('http')) {
      return \`<a href="#" onclick="event.preventDefault();navTo('\${href}','\${currentPath}')">\${text}</a>\`;
    }
    return \`<a href="\${href || '#'}" target="_blank" rel="noopener">\${text}</a>\`;
  };

  marked.use({ renderer, breaks: false, gfm: true });
  return marked.parse(md);
}

function buildToC(el) {
  const headings = el.querySelectorAll('h1,h2,h3');
  const toc = document.getElementById('toc');
  toc.innerHTML = '';
  if (headings.length < 2) {
    document.getElementById('toc-panel').style.opacity = '0.4';
    return;
  }
  document.getElementById('toc-panel').style.opacity = '1';
  headings.forEach(h => {
    const id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    h.id = id;
    const a = document.createElement('a');
    a.className = 'toc-link toc-' + h.tagName.toLowerCase();
    a.textContent = h.textContent;
    a.href = '#' + id;
    a.onclick = e => { e.preventDefault(); h.scrollIntoView({ behavior: 'smooth' }); };
    toc.appendChild(a);
  });
}

// Relative link navigation
window.navTo = function(href, from) {
  const fromDir = from.split('/').slice(0,-1).join('/');
  let resolved = href.replace(/^\\.\\//, fromDir ? fromDir + '/' : '');
  if (href.startsWith('../')) {
    const parts = fromDir.split('/');
    parts.pop();
    resolved = (parts.length ? parts.join('/') + '/' : '') + href.slice(3);
  }
  if (fileMap[resolved]) loadFile(resolved);
  else if (fileMap[href]) loadFile(href);
};

// Reading progress
document.getElementById('scroll').addEventListener('scroll', function() {
  const sh = this.scrollHeight - this.clientHeight;
  const pct = sh > 0 ? (this.scrollTop / sh) * 100 : 0;
  document.getElementById('progress').style.width = pct + '%';
});

// Auto-load README on start
const readme = FILES.find(f => f.path === 'README.md' || f.name === 'README.md');
if (readme) loadFile(readme.path);
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('Built index.html — ' + files.length + ' files.');
