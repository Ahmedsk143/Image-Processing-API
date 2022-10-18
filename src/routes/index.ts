import express from 'express';
import images from './api/images';
const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).json({ data: 'The root working' });
});
routes.use('/images', images);

export default routes;
