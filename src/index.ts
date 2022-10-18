import express from 'express';
import cors from 'cors';
import routes from './routes/index';

const app = express();
const port = 5555;

app.use(cors());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
});

export default app;
