import { readFileAsBase64 } from '@/libs/helpers';
import { PixelCrop } from 'react-image-crop';

const getScalePercentageString = (scale: number) =>
  `${Math.floor((scale - 1) * 100)}%`;

const TO_RADIANS = Math.PI / 180;

const renderCanvasPreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale: number,
  rotation: number = 0,
) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const rotateRads = rotation * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);

  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );

  ctx.restore();
};

const getCroppedImage = async (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
) => {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const offscreen = new OffscreenCanvas(
    crop.width * scaleX,
    crop.height * scaleY,
  );
  const ctx = offscreen.getContext('2d');
  if (!ctx) {
    throw new Error('No 2d context');
  }

  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    offscreen.width,
    offscreen.height,
  );

  const blob = await offscreen.convertToBlob({
    type: 'image/jpeg',
    quality: 0.9,
  });

  return readFileAsBase64(blob);
};

export { getScalePercentageString, renderCanvasPreview, getCroppedImage };
