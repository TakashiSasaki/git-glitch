# Clipboard Comparison Tester

This project demonstrates and compares two different methods for accessing clipboard data in modern browsers:

1. **Paste Event (`ClipboardEvent`)**
2. **Clipboard API (`navigator.clipboard.read()` and `readText()`)**

It visually logs and compares the types, sizes, and contents of data retrieved through both mechanisms.

## 🔍 Features

* Side-by-side panels:

  * **Paste Event** panel lets users press Ctrl+V or right-click to paste content
  * **Clipboard API** panel allows programmatic reading of clipboard content via button click
* For each item, the following is displayed:

  * MIME type
  * Character length (for strings)
  * Byte size (via Blob size calculation)
  * File name (if available)
* Supports multiple clipboard items (e.g., plain text + HTML, image + HTML)

## 🚀 Live Demo

Visit the live page here:
**[https://paste-event-vs-clipboard-api.glitch.me](https://paste-event-vs-clipboard-api.glitch.me)**

⚠️ **Note**: The Clipboard API (`navigator.clipboard.read()` and `readText()`) **will not work inside the Glitch editor interface** (`glitch.com/edit`) due to browser-enforced [Permissions Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy).

Specifically:

* The Glitch editor embeds your app inside an `<iframe>`
* Clipboard access requires top-level document context and secure HTTPS
* As a result, API access will be blocked with a `NotAllowedError`

Always open the live project URL directly (outside of the Glitch editor) to test Clipboard API features.

## 🧪 How to Test

1. Copy rich text or images from a webpage or an image editor
2. Paste into the **Paste Event** panel
3. Click the buttons in the **Clipboard API** panel to read programmatically
4. Observe differences in MIME types and payload sizes

## 🧠 Technical Notes

* `ClipboardEvent.clipboardData.items` often includes `File` objects (for images) and full `text/html` with wrappers (via CF\_HTML)
* `navigator.clipboard.read()` returns `ClipboardItem` objects, each of which exposes data as `Blob` (not `File`), and may return more sanitized HTML
* Character vs. byte length differences may result from newline normalization (`\r\n` → `\n`) and HTML sanitization
* Images appear as `File` via `paste` and `Blob` via `read()`, with identical binary content but different metadata

## 📁 Files

* `index.html` – main HTML and embedded CSS/JS
* No external dependencies (fully self-contained)

## 📝 License

MIT License

## 🙋 Author

Created by [Takashi Sasaki](https://x.com/TakashiSasaki)

---

Feel free to fork and modify this app for educational or debugging purposes.
