import { app } from './../index';
import request from 'supertest';
import sharp from 'sharp';

describe('resizeImage', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `/image?imageName=${imageName}&width=${width}&height=${height}`,
    );
  });

  it('should resize the image based on the provided query parameters', async () => {
    expect(response.status).toBe(200);
  });

  it('should resize the image to 100 x 100', async () => {
    const metadata = await sharp(response.body).metadata();
    expect(metadata.width).toEqual(100);
    expect(metadata.height).toEqual(100);
  });
});
describe('check middleware', () => {
  let response: request.Response;
  const imageName = 'image.pnx';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `/image?imageName=${imageName}&width=${width}&height=${height}`,
    );
  });

  it('should return a status code of 400 if the file extension is not allowed', async () => {
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid file extension');
  });

  xit('should call the next middleware if the file extension is allowed', async () => {
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
  });
});

describe('check Image Exist ', () => {
  let response: request.Response;
  const imageName = 'imageNotFound.png';
  const width = 100;
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `/image?imageName=${imageName}&width=${width}&height=${height}`,
    );
  });

  it('should return a status code of 404 if the image is not found', async () => {
    expect(response.status).toBe(404);
    expect(response.text).toBe('Image not found');
  });
});

describe('check An error occurred while resizing the image', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 100000;
  const height = 100000;

  beforeEach(async () => {
    response = await request(app).get(
      `/image?imageName=${imageName}&width=${width}&height=${height}`,
    );
  });
  it('should return a status code of 500 if An error occurred while resizing the image', async () => {
    expect(response.status).toBe(500);
    expect(response.text).toBe('An error occurred while resizing the image.');
  });
});

describe('check query', () => {
  let response: request.Response;
  const imageName = 'image.png';
  const width = 'a';
  const height = 100;

  beforeEach(async () => {
    response = await request(app).get(
      `/image?imageName=${imageName}&width=${width}&height=${height}`,
    );
  });
  it('should return a status code of 400 if Width and height not valid', async () => {
    expect(response.status).toBe(400);
    expect(response.text).toBe('Width and height must be positive integers');
  });
});
