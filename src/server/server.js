import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';

import loginRoutes from './routes/login';
import auth from './routes/auth';

const app = new Express();

app.use(bodyParser.json());
app.use(Express.static(path.join(__dirname, '..', '..', 'dist')));


app.use('/login', loginRoutes);
app.use('/auth', auth);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,  '..', '..', 'dist', 'index.html'));
});

export default app;