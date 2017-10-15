import express from 'express';
import { client as redisClient } from '../lib/redis.js';

const router = new express.Router();

router.post('/params', (req, res, next) => {
    if(req.body && req.body.temperature && req.body.humidity && req.body.time) {
        const { temperature, humidity, time } = req.body;
        console.log(time, temperature, humidity);
        redisClient.ts.add('TEMP_HUM', req.body.time, `${temperature};${humidity}`);
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