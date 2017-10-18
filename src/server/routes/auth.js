import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../config.json';

const router = new express.Router();

router.post('/', (req, res, next) => {
    if(req.body && req.body.token) {

        jwt.verify(req.body.token, config.jwtSecret, (err, decoded) => {
            if(err) {
                return res.json({
                    access: false,
                    redirectToLogin: true
                });
            }

            if(decoded && decoded.login === config.adminLogin && decoded.password === config.adminPassword) {
                return res.json({
                    access: true
                });
            }
            else {
                return res.json({
                    access: false
                });
            }
        })
    }
    else {
        return res.json({
            access: false,
            redirectToLogin: true
        });
    }
})

export default router;