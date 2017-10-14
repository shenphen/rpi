import express from 'express';
import jwt from 'jsonwebtoken';

import config from '../config.json';

const router = new express.Router();

router.post('/', (req, res, next) => {
    if(req.body && req.body.login === config.adminLogin && req.body.password === config.adminPassword) {
        const { login, password } = req.body;
        const token = jwt.sign({login, password}, config.jwtSecret, {expiresIn: 600});
        res.json({
            access: true,
            token
        })
        next();
    }
    else {
        res.json({
            access: false,
            error: 'Nieprawidłowy login i/lub hasło'
        })
    }
})

export default router;