import { MIN_IMAGE_DIMENSIONS_PX } from '@/pages/new-image/libs/constants';

const validateImageDimensions = (
  imageSrc: string,
  minDimensions = MIN_IMAGE_DIMENSIONS_PX,
): Promise<boolean> =>
  new Promise((res) => {
    const image = new Image();
    image.src = imageSrc;

    image.addEventListener('load', (e) => {
      const { naturalWidth, naturalHeight } =
        e.currentTarget as HTMLImageElement;

      if (naturalHeight < minDimensions || naturalWidth < minDimensions) {
        return res(false);
      }

      return res(true);
    });
  });

export { validateImageDimensions };
