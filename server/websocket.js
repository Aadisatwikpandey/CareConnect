const WebSocket = require('ws');
const { spawn } = require('child_process');
const path = require('path');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            const query = data.message;

            // Using PowerShell to execute Ollama command
            const ollama = spawn('powershell.exe', [
                '-Command',
                `& ollama run mistral "${query}"`
            ]);

            let response = '';

            ollama.stdout.on('data', (data) => {
                response += data.toString();
            });

            ollama.stderr.on('data', (data) => {
                console.error(`Ollama Error: ${data}`);
            });

            ollama.on('close', (code) => {
                if (code !== 0) {
                    ws.send(JSON.stringify({
                        message: "I apologize, but I encountered an error. Could you please rephrase your question?"
                    }));
                } else {
                    ws.send(JSON.stringify({ message: response.trim() }));
                }
            });

        } catch (error) {
            console.error('Error:', error);
            ws.send(JSON.stringify({
                message: "I apologize, but something went wrong. Please try again."
            }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on port 3001');