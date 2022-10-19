import express from 'express';
import images from './api/images';
import names from './api/names';
const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
    res.status(200).json({ data: 'The root working' });
});
routes.use('/images', images);
routes.use('/names', names);

export default routes;
