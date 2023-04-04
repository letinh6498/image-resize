import { Request, Response, NextFunction } from 'express';
import path from 'path';

const ALLOWED_IMAGE_FORMATS = ['jpeg', 'png', 'jpg'];

export const checkImageFormat = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { imageName } = req.query;
  const imageFormat = path.extname(imageName as string).slice(1);

  if (!ALLOWED_IMAGE_FORMATS.includes(imageFormat)) {
    res.status(400).send('Invalid file extension');
    return;
  }

  next();
};
