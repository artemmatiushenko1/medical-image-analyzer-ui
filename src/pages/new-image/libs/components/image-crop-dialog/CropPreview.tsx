import { Box } from '@mui/material';
import { styles } from './styles';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { PixelCrop } from 'react-image-crop';
import { setCanvasPreview } from './helpers';

type CropPreviewProps = {
  imgElement: HTMLImageElement;
  pixelCrop: PixelCrop;
};

type CropPreviewRef = {
  exportImage: () => string | null;
};

const CropPreview = forwardRef<CropPreviewRef, CropPreviewProps>(
  (props, ref) => {
    const innerCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const { pixelCrop, imgElement } = props;

    useEffect(() => {
      if (!innerCanvasRef.current) return;

      setCanvasPreview(imgElement, innerCanvasRef.current, pixelCrop);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pixelCrop.height, pixelCrop.width, pixelCrop.x, pixelCrop.y]);

    useImperativeHandle(ref, () => ({
      exportImage: () => {
        if (!innerCanvasRef.current) return null;
        return innerCanvasRef.current.toDataURL();
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
