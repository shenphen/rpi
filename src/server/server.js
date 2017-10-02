import path from 'path';
import Express from 'express';

const app = new Express();

app.use(Express.static(path.join(__dirname, '..', '..', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,  '..', '..', 'dist', 'index.html'));
});

export default app;