import express from 'express';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const imageProcess = (req: express.Request, res: express.Response): void => {
    if (req.query.filename && req.query.width && req.query.height) {
        const width = parseInt(req.query.width as string);
        const height = parseInt(req.query.height as string);
        const name = req.query.filename as unknown as string;
        const sourceImg = `src/full/${name}.jpg`;
        const outputImg = `src/thumb/${name}-width${width}-height${height}.jpg`;
        imageNotFound(sourceImg, res);
        // in case the image already exists=> serve
        if (fs.existsSync(outputImg)) {
            res.status(200).sendFile(path.resolve(outputImg));
        }
        // if it doesn't exist => process and serve
        else {
            sharp(sourceImg)
                .resize({ width, height })
                .toFile(outputImg, (err) => {
                    // in case the process fails
                    if (err !== null) {
                        res.status(500).json(
                            JSON.stringify({
                                message: 'An error occured during processing',
                            })
                        );
                    } else {
                        console.log('Image has been processed');
                        res.status(200).sendFile(path.resolve(outputImg));
                    }
                });
        }
    } else if (req.query.filename) {
        const name = req.query.filename as unknown as string;
        const sourceImg = `src/full/${name}.jpg`;
        imageNotFound(sourceImg, res);
        res.status(200).sendFile(path.resolve(sourceImg));
    } else {
        res.status(200).json({
            message: 'Specify the image name, width, and height',
        });
    }
};

function imageNotFound(sourceImg: string, res: express.Response) {
    if (fs.existsSync(sourceImg)) {
        return;
    } else {
        res.status(400).json({ message: 'Image not found' });
    }
}
export default imageProcess;
