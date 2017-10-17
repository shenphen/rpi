import redis from 'redis';
import bluebird from 'bluebird';
const debug = require('debug')('redis');

const config = {
    port: process.env.REDIS_PORT || 6379,
    bin: process.env.REDIS_BIN_PATH || '/usr/local/bin/redis-server'
}

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(config.port);

client.on('connect' , () => debug('redis connected'));
client.on('error' , (error) => debug(error));

export default client;