import express from 'express';
import fs from 'fs';

const getFullNames = (req: express.Request, res: express.Response): void => {
    fs.readdir('src/full', function (err, fileNames) {
        res.json(JSON.stringify(fileNames));
    });
};

const getThumbNames = (req: express.Request, res: express.Response): void => {
    fs.readdir('src/thumb', function (err, fileNames) {
        res.json(JSON.stringify(fileNames));
    });
};

export { getFullNames, getThumbNames };
