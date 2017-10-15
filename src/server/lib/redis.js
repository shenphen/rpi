import redis from 'redis';
import RedisServer from 'redis-server';
import bluebird from 'bluebird';
const debug = require('debug')('redis');

const config = {
    port: process.env.REDIS_PORT || 6379,
    bin: process.env.REDIS_BIN_PATH || '/usr/local/bin/redis-server'
}

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class RedisConnection {
    constructor() {
        this.port = config.port;
        // this.server = new RedisServer(config);
        this.client = null;
    }

    run() {
        this.client = redis.createClient(this.port);
        // this.server.open()
        //   .then(() => {
        //       debug(`Redis server runs on port ${this.port}`);
        //       this.client = redis.createClient(this.port);
        //   })
        //   .catch(err => {
        //       debug(err);
        //   })
    }
}

export default RedisConnection;