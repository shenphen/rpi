import express from 'express';
import db from '../lib/redis.js';

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

export default router;