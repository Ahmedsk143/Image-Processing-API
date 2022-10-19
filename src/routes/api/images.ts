import express from 'express';
import imageProcess from '../../utilities/image-process';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/full');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

const images = express.Router();

images.get('/', imageProcess);
images.post('/', upload.single('image'), (req, res) => {
    res.json({ message: 'Request recived' });
});
export default images;
