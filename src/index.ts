import express from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = 5555;

app.use('/api', routes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
});

export default app;
