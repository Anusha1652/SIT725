// server.js
const express = require('express');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);

// attach socket.io
const { Server } = require('socket.io');
const io = new Server(httpServer);

// serve static files from public folder
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // send random number every second
  setInterval(() => {
    const randomNum = Math.floor(Math.random() * 10);
    socket.emit('number', randomNum);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});


