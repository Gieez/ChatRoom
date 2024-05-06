const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let countUserOnline = 1;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('join', () => {
    console.log('User joined');
    countUserOnline++;
    io.emit('countUserOnline', countUserOnline);
  });

  socket.on('message', (param) => {
    console.log('User sent a message');
    io.emit('message', param);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    countUserOnline--;
    io.emit('countUserOnline', countUserOnline);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
