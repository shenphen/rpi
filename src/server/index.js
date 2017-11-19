import { Server } from 'http';
import app from './server';
import socket from 'socket.io';
const debug = require('debug')('server');

const server = new Server(app);
const io = socket(server);

let port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  };

  process.env.PORT = port;
  console.info(`Server running on http://localhost:${port} [${env}]`);
});

io.on('connection', function (socket) {
  console.log(socket.id);

  socket.on('control', function (data) {
    console.log(data);
    socket.broadcast.emit('control', data);
  });
});

server.on('error', errorHandler);
let retryTimes = process.env.PORT_RETRY_TIMES || 5;

function errorHandler(err) {
  if(err && err.code === 'EADDRINUSE' && retryTimes > 0) {
    try {
      port += 1;
      --retryTimes;
      debug(`Trying to run server on port ${port}`)
      return server.listen(port, errorHandler);
    }
    catch(err) {
      return errorHandler(err);
    }
  }
  else if(err) {
    throw new Error(err);
  }
}