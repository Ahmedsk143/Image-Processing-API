import sharp from 'sharp';

const transform = (
    sourceImg: string,
    width: number,
    height: number,
    outputImg: string
): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        sharp(sourceImg)
            .resize({ width, height })
            .toFile(outputImg, (err) => {
                // in case the process fails
                if (err !== null) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });
    });
};
export default transform;
