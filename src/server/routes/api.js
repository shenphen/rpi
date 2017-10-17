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

        db.send_commandAsync('TS.RANGE', [req.query.param, FROM, TO])
        .then(range => {

            let data = {};

            for(let i = 0, l = range.length; i < l; ++i) {
                data[range[i][0]] = range[i][1];
            }
            
            res.json({
                status: 'OK',
                data: JSON.stringify(data)
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