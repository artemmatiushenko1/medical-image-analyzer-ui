import { Box } from '@mui/material';
import { styles } from './styles';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { PixelCrop } from 'react-image-crop';
import { getCroppedImage, renderCanvasPreview } from './helpers';
import { CropSettings } from './types';

type CropPreviewProps = {
  imgElement: HTMLImageElement;
  pixelCrop: PixelCrop;
  cropSettings: CropSettings;
};

type CropPreviewRef = {
  exportImage: () => Promise<string | null>;
};

const CropPreview = forwardRef<CropPreviewRef, CropPreviewProps>(
  (props, ref) => {
    const innerCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const { pixelCrop, imgElement, cropSettings } = props;

    useEffect(() => {
      if (!innerCanvasRef.current) return;

      renderCanvasPreview(
        imgElement,
        innerCanvasRef.current,
        pixelCrop,
        cropSettings.scale,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      pixelCrop.height,
      pixelCrop.width,
      pixelCrop.x,
      pixelCrop.y,
      cropSettings.scale,
    ]);

    useImperativeHandle(ref, () => ({
      exportImage: async () => {
        if (!innerCanvasRef.current) return null;
        return getCroppedImage(imgElement, innerCanvasRef.current, pixelCrop);
      },
    }));

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
