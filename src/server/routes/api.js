import express from 'express';
import db from '../lib/redis.js';
const debug = require('debug')('api');

const router = new express.Router();

router.post('/params', (req, res, next) => {
    if(req.body && req.body.temperature && req.body.humidity && req.body.time) {
        const { temperature, humidity, time } = req.body;
        console.log(time, temperature, humidity);

        db.send_command('TS.ADD', ['temperature', time, temperature]);
        db.send_command('TS.ADD', ['humidity', time, humidity]);

        db.lpush('last_temperature', temperature);
        db.ltrim('last_temperature', 0, 119);
        db.lpush('last_humidity', humidity);
        db.ltrim('last_humidity', 0, 119);
        db.lpush('last_time', time);
        db.ltrim('last_time', 0, 119);

        res.json({
            status: 'OK',
        })
    }
    else {
        res.json({
            status: 'NOT OK',
        })
    }
})

router.get('/params', (req, res, next) => {
    const avaibleParams = ['temperature', 'humidity'];
    if(req.query && req.query.from && req.query.to && avaibleParams.indexOf(req.query.param) !== -1) {
        const FROM = parseInt(req.query.from, 10) || 0;
        const TO = parseInt(req.query.to, 10) || 0;

        db.send_commandAsync('TS.RANGE', [req.query.param, FROM, TO])
        .then(data => {
            res.json({
                status: 'OK',
                data
            })
        })
        .catch(err => {
            debug(err);
        });
    }
    else if(req.query && req.query.recent) {
        let queries = [];
        const params = ['last_temperature', 'last_humidity', 'last_time'];

        params.forEach(param => {
            queries.push(db.lrangeAsync(param, 0, -1));
        })
        Promise.all(queries)
        .then(data => {
            console.log('DANE', data);
            res.json({
                status: 'OK',
                data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    else {
        res.json({
            data: {},
            status: 'BAD_QUERY'
        })
    }
})

export default router;