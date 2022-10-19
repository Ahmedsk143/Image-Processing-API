import express from 'express';
import path from 'path';
import fs from 'fs';
import transform from './transform';

const imageProcess = (req: express.Request, res: express.Response): void => {
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const name = req.query.filename as unknown as string;
    const sourceImg = `src/full/${name}.jpg`;
    const outputImg = `src/thumb/${name}-width=${width}-height=${height}.jpg`;

    // Case 1: The user provides the filename, width, height
    // return: the processed image if doesn't exist
    if (name && width && height) {
        if (fs.existsSync(outputImg)) {
            console.log('A thumbnail image has been sent');
            res.status(200).sendFile(path.resolve(outputImg));
        } else {
            transform(sourceImg, width, height, outputImg)
                .then(() => {
                    console.log('A thumbnail image has been created and sent');
                    res.status(200).sendFile(path.resolve(outputImg));
                })
                .catch(() => {
                    res.status(400).json({
                        message: 'Failed to process the image',
                    });
                });
        }
    }
    // Case 2: The user only provides the name and other values are undefined not NaN
    // return: the original image
    else if (
        name &&
        (req.query.width === '' ||
            req.query.width === undefined ||
            req.query.height === '' ||
            req.query.height === undefined)
    ) {
        if (fs.existsSync(sourceImg)) {
            console.log('A full image has been sent');
            res.status(200).sendFile(path.resolve(sourceImg));
        } else {
            res.status(400).json({ message: 'Image is not found' });
        }
    }
    // Case 3: The user provies a name and an invalid width or height
    //return: error message
    else if (name && (isNaN(width) || isNaN(height))) {
        res.status(400).json({
            message: 'Invalid width or height value',
        });
    }
    // Case 4: The user didn't provide the name
    // return: error message
    else {
        res.status(400).json({
            message: 'Please provide the image name, width, and height',
        });
    }
};

export default imageProcess;
