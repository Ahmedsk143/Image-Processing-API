import express from 'express';
import imageProcess from '../../utilities/image-process';

const images = express.Router();

images.get('/', imageProcess);

export default images;
