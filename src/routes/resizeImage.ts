import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const IMAGES_DIRECTORY = path.join(__dirname, '..', 'images');
const RESIZED_IMAGES_DIRECTORY = path.join(__dirname, '..', 'resized');

if (!fs.existsSync(RESIZED_IMAGES_DIRECTORY)) {
    fs.mkdirSync(RESIZED_IMAGES_DIRECTORY);
}

export const resizeImage = async (req: Request, res: Response) => {
    const { width, height, imageName } = req.query;
    const widthInt = parseInt(width as string);
    const heightInt = parseInt(height as string);

    if (!widthInt || !heightInt || !imageName) {
        res.status(400).send(
            'Missing required query parameters: width, height, imageName'
        );
        return;
    }

    try {
        const imagePath = path.join(IMAGES_DIRECTORY, imageName as string);
        const resizedImagePath = path.join(
            RESIZED_IMAGES_DIRECTORY,
            `${imageName}_${width}x${height}.jpg`
        );

        if (!fs.existsSync(imagePath)) {
            res.status(404).send('Image not found');
            return;
        }

        if (fs.existsSync(resizedImagePath)) {
            res.sendFile(resizedImagePath);
        } else {
            await sharp(imagePath)
                .resize(widthInt, heightInt)
                .toFile(resizedImagePath);
            res.sendFile(resizedImagePath);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while resizing the image.');
    }
};
