import { Server } from 'http';
import app from './server'
import RedisConnection from './lib/redis';

const redisConnection = new RedisConnection();

redisConnection.run();

const server = new Server(app);

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});