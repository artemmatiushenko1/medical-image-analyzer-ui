import { Box } from '@mui/material';
import { styles } from './styles';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { PercentCrop, convertToPixelCrop } from 'react-image-crop';
import { getCroppedImage, renderCanvasPreview } from './helpers';
import { CropSettings } from './types';

type CropPreviewProps = {
  imgElement: HTMLImageElement;
  cropSettings: CropSettings;
  crop: PercentCrop;
};

type CropPreviewRef = {
  exportImage: () => Promise<string | null>;
};

const CropPreview = forwardRef<CropPreviewRef, CropPreviewProps>(
  (props, ref) => {
    const innerCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const { imgElement, cropSettings, crop } = props;

    const pixelCrop = convertToPixelCrop(
      crop,
      imgElement.width,
      imgElement.height,
    );

    useEffect(() => {
      if (!innerCanvasRef.current) return;

      renderCanvasPreview(
        imgElement,
        innerCanvasRef.current,
        pixelCrop,
        cropSettings.scale,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [crop.height, crop.width, crop.x, crop.y, cropSettings.scale]);

    useImperativeHandle(
      ref,
      () => ({
        exportImage: async () => {
          if (!innerCanvasRef.current) return null;
          return getCroppedImage(imgElement, innerCanvasRef.current, pixelCrop);
        },
      }),
      [
        imgElement,
        pixelCrop.height,
        pixelCrop.width,
        pixelCrop.x,
        pixelCrop.y,
        innerCanvasRef.current,
      ],
    );

    return (
      <Box
        component="canvas"
        ref={innerCanvasRef}
        sx={styles.cropPreviewRoot}
      />
    );
  },
);

export { CropPreview, type CropPreviewRef };
