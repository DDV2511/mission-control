# OpenClaw Mission Control Dashboard

A centralized web dashboard for monitoring and managing OpenClaw agents.

## Quick Start

Open `index.html` in your browser:
```bash
# From the mission-control directory
open index.html
# Or serve locally
python -m http.server 8080
```

## Features

### 🎯 Agent Fleet Overview
- Real-time status of all connected agents
- Active/Idle/Offline counts
- Current task assignments

### 📋 Kanban Task Board
- Pending, Active, Completed, Failed columns
- Progress bars for running tasks
- Priority indicators

### 📜 Session Logs
- Timestamped log entries
- Color-coded severity levels
- Auto-scrolling feed

### 💓 System Health
- Memory usage tracking
- Uptime counter
- Token usage (24h)
- API latency monitor

### ⚡ Quick Actions
- Spawn new agents
- Clear logs
- Refresh status
- Export data
- Emergency stop

## Architecture

```
mission-control/
├── index.html      # Main dashboard UI
├── styles.css      # Dark theme styling
├── app.js          # Interactive functionality
├── PROGRESS.md     # Build progress
└── README.md       # This file
```

## Development

This is an active project with scheduled iterations:
- Every 30 minutes: Development improvements
- Daily at 7:00 AM: Progress updates

## Future Enhancements

- [ ] Real OpenClaw API integration
- [ ] Live WebSocket connections
- [ ] Task creation and editing
- [ ] Agent spawn/kill controls
- [ ] Session persistence
- [ ] Custom themes

---

Built with ⚗️ by Heisenberg