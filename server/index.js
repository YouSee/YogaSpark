const express = require('express');
const { resolve } = require('path');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

const publicPath = resolve(__dirname, '../dist/');
const app = express();

app.use(express.static(publicPath));

wss.on('connection', function connection(ws) {
  console.log('client connected');
});

process.on('SIGHUP', function() {
  console.log('sender reload til client');
  // Broadcast to all.
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send('RELOAD BITCH!');
    }
  });
});

app.listen(3000, () => console.log('App listening on port 3000'));
