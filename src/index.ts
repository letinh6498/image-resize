import express from 'express';
import { checkImageFormat } from './middlewares/checkImageFormat';
import { resizeImage } from './routes/resizeImage';
export const app = express();

app.use('/image', checkImageFormat, resizeImage);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
