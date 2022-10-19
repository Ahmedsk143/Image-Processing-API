import express from 'express';
import { getFullNames, getThumbNames } from '../../utilities/get-namaes';
const names = express.Router();

names.get('/full', getFullNames);
names.get('/thumb', getThumbNames);

export default names;
