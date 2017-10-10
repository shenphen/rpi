import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';

import loginRoutes from './routes/login';

const app = new Express();

app.use(bodyParser.json({strict: false}));
app.use(Express.static(path.join(__dirname, '..', '..', 'dist')));


app.use('/login', loginRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,  '..', '..', 'dist', 'index.html'));
});

export default app;