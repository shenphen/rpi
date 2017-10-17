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

        db.send_commandAsync('TS.RANGE', [req.body.param, FROM, TO])
        .then(result => {
            console.log(result);
            
            res.json({
                status: 'OK',
                data: {'YOU_LUCKY': 'GUY'}
            })
        })
        .catch(err => {
            debug(err);
        });
    }
    else {
        res.json({
            data: {},
            status: 'BAD_QUERY'
        })
    }
})

export default router;