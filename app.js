// OpenClaw Mission Control - Interactive Dashboard

class MissionControl {
    constructor() {
        this.agents = [
            { id: 'kimi', name: 'Kimi K2.5', status: 'active', task: 'Building Mission Control', model: 'ollama/kimi-k2.5:cloud' },
            { id: 'haiku', name: 'Claude Haiku', status: 'idle', task: 'Standby', model: 'openrouter/claude-3.5-haiku' },
            { id: 'mini', name: 'GPT-4o Mini', status: 'idle', task: 'Standby', model: 'openrouter/gpt-4o-mini' },
            { id: 'llama', name: 'Llama 3.1 70B', status: 'active', task: 'Code review', model: 'openrouter/llama-3.1-70b' },
            { id: 'flash', name: 'GLM-4.7 Flash', status: 'active', task: 'Quick tasks', model: 'ollama/glm-4.7-flash' }
        ];
        
        this.logs = [];
        this.metrics = {
            memory: { value: 2.4, max: 5.0, unit: 'GB' },
            uptime: { hours: 12, minutes: 34 },
            tokens: { value: 45200, max: 100000 },
            latency: { value: 124, unit: 'ms' }
        };
        
        this.init();
    }
    
    init() {
        this.startClock();
        this.renderAgents();
        this.startSimulation();
        this.addLog('INFO', 'Mission Control dashboard initialized');
        this.addLog('SUCCESS', 'Connected to OpenClaw gateway');
    }
    
    startClock() {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
            const dateStr = now.toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
            
            document.getElementById('clock').textContent = timeStr;
            document.getElementById('date').textContent = dateStr;
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    }
    
    renderAgents() {
        const container = document.getElementById('agent-list');
        container.innerHTML = '';
        
        this.agents.forEach(agent => {
            const el = document.createElement('div');
            el.className = 'agent-item';
            el.innerHTML = `
                <span class="agent-status ${agent.status}"></span>
                <span class="agent-name">${agent.name}</span>
                <span class="agent-task">${agent.task}</span>
            `;
            container.appendChild(el);
        });
        
        // Update stats
        const active = this.agents.filter(a => a.status === 'active').length;
        const idle = this.agents.filter(a => a.status === 'idle').length;
        const offline = this.agents.filter(a => a.status === 'offline').length;
        
        document.getElementById('active-agents').textContent = active;
        document.getElementById('idle-agents').textContent = idle;
        document.getElementById('offline-agents').textContent = offline;
    }
    
    addLog(level, message) {
        const now = new Date();
        const timestamp = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        
        this.logs.unshift({ timestamp, level, message });
        if (this.logs.length > 50) this.logs.pop();
        
        this.renderLogs();
    }
    
    renderLogs() {
        const container = document.getElementById('log-container');
        container.innerHTML = '';
        
        this.logs.forEach(log => {
            const el = document.createElement('div');
            el.className = 'log-entry';
            el.style.borderLeft = `3px solid var(--accent-${log.level.toLowerCase() === 'success' ? 'green' : log.level.toLowerCase() === 'warn' ? 'yellow' : log.level.toLowerCase() === 'error' ? 'red' : 'blue'})`;
            el.innerHTML = `
                <span class="timestamp">${log.timestamp}</span>
                <span class="level ${log.level.toLowerCase()}">[${log.level}]</span>
                <span class="message">${log.message}</span>
            `;
            container.appendChild(el);
        });
    }
    
    updateMetrics() {
        // Simulate metric changes
        this.metrics.memory.value = Math.max(1.0, Math.min(4.5, this.metrics.memory.value + (Math.random() - 0.5) * 0.2));
        this.metrics.latency.value = Math.max(50, Math.min(300, this.metrics.latency.value + (Math.random() - 0.5) * 20));
        this.metrics.tokens.value += Math.floor(Math.random() * 100);
        
        // Update display
        document.getElementById('memory-usage').textContent = `${this.metrics.memory.value.toFixed(1)} GB`;
        document.getElementById('latency').textContent = `${Math.floor(this.metrics.latency.value)}ms`;
        document.getElementById('token-usage').textContent = `${(this.metrics.tokens.value / 1000).toFixed(1)}K`;
        
        // Update bars
        const memoryPercent = (this.metrics.memory.value / this.metrics.memory.max) * 100;
        document.querySelector('.metric:nth-child(1) .metric-fill').style.width = `${memoryPercent}%`;
        
        const tokenPercent = (this.metrics.tokens.value / this.metrics.tokens.max) * 100;
        document.querySelector('.metric:nth-child(3) .metric-fill').style.width = `${Math.min(100, tokenPercent)}%`;
    }
    
    startSimulation() {
        // Simulate agent activity
        setInterval(() => {
            const randomAgent = this.agents[Math.floor(Math.random() * this.agents.length)];
            const activities = [
                'Processing task',
                'Analyzing code',
                'Generating response',
                'Waiting for input',
                'Completed task'
            ];
            
            if (Math.random() > 0.7) {
                const activity = activities[Math.floor(Math.random() * activities.length)];
                this.addLog('INFO', `${randomAgent.name}: ${activity}`);
            }
            
            // Occasionally change agent status
            if (Math.random() > 0.9) {
                const statuses = ['active', 'idle', 'active'];
                randomAgent.status = statuses[Math.floor(Math.random() * statuses.length)];
                this.renderAgents();
            }
        }, 5000);
        
        // Update metrics every 3 seconds
        setInterval(() => this.updateMetrics(), 3000);
        
        // Update uptime
        setInterval(() => {
            this.metrics.uptime.minutes++;
            if (this.metrics.uptime.minutes >= 60) {
                this.metrics.uptime.minutes = 0;
                this.metrics.uptime.hours++;
            }
            document.getElementById('uptime').textContent = 
                `${this.metrics.uptime.hours}h ${this.metrics.uptime.minutes}m`;
        }, 60000);
    }
}

// Quick Actions
function spawnAgent() {
    const models = ['haiku', 'mini', 'llama', 'flash'];
    const model = models[Math.floor(Math.random() * models.length)];
    window.missionControl.addLog('SUCCESS', `Spawned new agent: ${model}`);
}

function clearLogs() {
    window.missionControl.logs = [];
    window.missionControl.renderLogs();
    window.missionControl.addLog('INFO', 'Logs cleared');
}

function refreshStatus() {
    window.missionControl.renderAgents();
    window.missionControl.updateMetrics();
    window.missionControl.addLog('INFO', 'Status refreshed');
}

function exportData() {
    const data = {
        timestamp: new Date().toISOString(),
        agents: window.missionControl.agents,
        metrics: window.missionControl.metrics,
        logs: window.missionControl.logs
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mission-control-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    window.missionControl.addLog('SUCCESS', 'Data exported to file');
}

function emergencyStop() {
    if (confirm('⚠️ EMERGENCY STOP: This will halt all active agents. Continue?')) {
        window.missionControl.agents.forEach(agent => {
            if (agent.status === 'active') {
                agent.status = 'idle';
                agent.task = 'Stopped';
            }
        });
        window.missionControl.renderAgents();
        window.missionControl.addLog('ERROR', 'EMERGENCY STOP activated - all agents halted');
        
        document.querySelector('.status-indicator').classList.remove('online');
        document.querySelector('.status-indicator').classList.add('offline');
        document.querySelector('.status-text').textContent = 'SYSTEM HALTED';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.missionControl = new MissionControl();
});