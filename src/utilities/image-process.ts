import express from 'express';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const imageProcess = (req: express.Request, res: express.Response): void => {
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const name = req.query.filename as unknown as string;
    const sourceImg = `src/full/${name}.jpg`;
    const outputImg = `src/thumb/${name}-width${width}-height${height}.jpg`;
    // The user sent the filename, width, height
    if (name && width && height) {
        if (fs.existsSync(outputImg)) {
            res.status(200).sendFile(path.resolve(outputImg));
        } else {
            sharp(sourceImg)
                .resize({ width, height })
                .toFile(outputImg, (err) => {
                    // in case the process fails
                    if (err !== null) {
                        console.log(err);
                        res.status(400).json({ message: 'Image not found' });
                    } else {
                        console.log('Image has been processed');
                        res.status(200).sendFile(path.resolve(outputImg));
                    }
                });
        }
        // The user only provides the name
    } else if (name) {
        if (fs.existsSync(sourceImg)) {
            res.status(200).sendFile(path.resolve(sourceImg));
        } else {
            res.status(400).json({ message: 'Image not found' });
        }
        // The user didn't sent any queries
    } else {
        res.status(200).json({
            message: 'Specify the image name, width, and height',
        });
    }
};

export default imageProcess;
