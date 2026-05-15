# Video Floating Navigator

Chrome extension that adds a button directly on video elements to detach them from the browser and float them on top of all windows.

## How it works

Hovering over a video reveals a **Float** button at the top. Clicking it triggers the browser's native Picture-in-Picture mode — the video becomes a floating window, resizable and always on top of every other window and application.

The button also appears automatically for 2.5 seconds when a video starts playing.

Works with dynamically loaded videos (YouTube, Twitch, Netflix, and any site using a `<video>` element).

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/LoganDELMAIRE/Video-floating-navigator.git
   ```
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the cloned folder

## Structure

```
├── manifest.json   # Manifest V3 config
├── content.js      # Video detection and button injection
├── content.css     # Floating button styles
└── icons/          # Icons 16 / 48 / 128 px
```

## Requirements

Chrome 92+ (Picture-in-Picture API support required).
