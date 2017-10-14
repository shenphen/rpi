import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../config.json';

const router = new express.Router();

router.post('/', (req, res, next) => {
    if(req.body && req.body.token) {
        const { login, password } = req.body;
        const token = jwt.sign({ login, password }, config.jwtSecret, { expiresIn: config.tokenExpiresInSeconds });

        jwt.verify(req.body.token, config.jwtSecret, (err, decoded) => {
            if(err) {
                return res.status(401).end();
            }

            if(decoded.login === config.adminLogin && decoded.password === config.adminPassword) {
                res.json({
                    access: true,
                    token
                })
                return next();
            }

            return res.status(404).end();
        })
    }
    else {
        return res.status(401).end();
    }
})

export default router;