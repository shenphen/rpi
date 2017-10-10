const express = require('express');
const router = new express.Router();

router.post('/', (req, res, next) => {
    if(req.body && req.body.login === 'admin' && req.body.password === 'admin') {
        res.json({
            access: true,
            token: 'abcdefghijklmnoprstuwvxyz'
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