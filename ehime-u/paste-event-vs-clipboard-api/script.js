// script.js

// --- Paste Event handler ---
const pasteArea = document.getElementById('pasteArea');
const pasteLog = document.getElementById('pasteLog');

pasteArea.addEventListener('paste', async event => {
  event.preventDefault();
  pasteLog.textContent = '';

  const items = Array.from(event.clipboardData.items);
  const tasks = items.map((item, i) => {
    const info = [`Item ${i}: MIME type = ${item.type}`];
    if (item.kind === 'file') {
      // File objects are returned synchronously
      const file = item.getAsFile();
      info.push(`  [File] name=${file.name}, size=${file.size} bytes`);
      return Promise.resolve(info.join('\n'));
    } else {
      // Text items use an asynchronous callback
      return new Promise(resolve => {
        item.getAsString(text => {
          const blob = new Blob([text], { type: item.type });
          info.push(`  [String] length=${text.length} chars, size=${blob.size} bytes`);
          resolve(info.join('\n'));
        });
      });
    }
  });

  const lines = await Promise.all(tasks);
  pasteLog.textContent = lines.join('\n\n');
});

// --- Clipboard API handlers ---
const readTextBtn = document.getElementById('readTextBtn');
const readBtn = document.getElementById('readBtn');
const apiLog = document.getElementById('apiLog');

readTextBtn.addEventListener('click', async () => {
  apiLog.textContent = '';
  try {
    const text = await navigator.clipboard.readText();
    apiLog.textContent = `readText() →\n${text}`;
  } catch (err) {
    apiLog.textContent = `Error reading text: ${err}`;
  }
});

readBtn.addEventListener('click', async () => {
  apiLog.textContent = '';
  if (!navigator.clipboard.read) {
    apiLog.textContent = 'navigator.clipboard.read() is not supported in this browser.';
    return;
  }
  try {
    const items = await navigator.clipboard.read();
    for (const [idx, item] of items.entries()) {
      for (const type of item.types) {
        apiLog.textContent += `Item ${idx}: type=${type}\n`;
        const blob = await item.getType(type);
        if (type.startsWith('text/')) {
          const text = await blob.text();
          apiLog.textContent += `  [Text] length=${text.length} chars, size=${blob.size} bytes\n\n`;
        } else {
          apiLog.textContent += `  [Blob] size=${blob.size} bytes\n\n`;
        }
      }
    }
  } catch (err) {
    apiLog.textContent = `Error reading items: ${err}`;
  }
});

// --- README toggle (marked.js) ---
const toggleBtn = document.getElementById('toggleReadmeBtn');
const experimentView = document.getElementById('experimentView');
const readmeView = document.getElementById('readmeView');
const readmeContent = document.getElementById('readmeContent');
let showingReadme = false;

toggleBtn.addEventListener('click', () => {
  showingReadme = !showingReadme;
  if (showingReadme) {
    experimentView.style.display = 'none';
    readmeView.style.display = 'block';
    toggleBtn.textContent = '🔬 Back to Test';
    fetch('README.md')
      .then(res => res.text())
      .then(md => {
        readmeContent.innerHTML = marked.parse(md);
      });
  } else {
    experimentView.style.display = 'flex';
    readmeView.style.display = 'none';
    toggleBtn.textContent = '📖 View README';
  }
});
