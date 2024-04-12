import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import { styles } from './styles';

import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropDialog = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef('');

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();

  const handleCropChange = (crop: Crop) => {
    setCrop(crop);
  };

  const handleCropComplete = (crop: Crop) => {
    setCompletedCrop(crop);
  };

  const handleCropSave = async () => {
    if (!imageRef.current || !crop) return;

    const canvasElement = document.createElement('canvas');

    const image = imageRef.current;
    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
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
      canvasElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    }
  };

  return (
    <Dialog open PaperProps={{ sx: { borderRadius: 3, maxWidth: '900px' } }}>
      <DialogTitle>
        <Typography variant="body1" fontWeight={600}>
          Crop image
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={styles.dialogContentWrapper}>
          <ReactCrop
            crop={crop}
            onChange={handleCropChange}
            onComplete={handleCropComplete}
            style={{
              alignSelf: 'self-start',
              borderRadius: 9,
              overflow: 'hidden',
            }}
          >
            <img src="https://media.post.rvohealth.io/wp-content/uploads/2020/08/pelvis-x-ray_thumb-1-732x549.jpg" />
          </ReactCrop>
          <Stack gap={2}>
            <Stack gap={1}>
              <Typography variant="caption">Preview</Typography>
              <img
                width="300px"
                height="200px"
                style={{
                  objectFit: 'contain',
                  backgroundColor: '#000',
                  borderRadius: 9,
                }}
                src="https://media.post.rvohealth.io/wp-content/uploads/2020/08/pelvis-x-ray_thumb-1-732x549.jpg"
              />
            </Stack>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption">Rotate</Typography>
                <Typography variant="caption">90&deg;</Typography>
              </Box>
              <Slider />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption">Scale</Typography>
                <Typography variant="caption">90%</Typography>
              </Box>
              <Slider />
            </Box>
            <Box>
              <Checkbox />
              <Typography variant="caption">Preserve aspect ratio</Typography>
            </Box>
            <DialogActions>
              <Button color="error">Cancel</Button>
              <Button variant="contained">Save</Button>
            </DialogActions>
          </Stack>
        </Box>
      </DialogContent>
      <a
        href="#hidden"
        ref={hiddenAnchorRef}
        download
        style={{
          position: 'absolute',
          top: '-200vh',
          visibility: 'hidden',
        }}
      >
        Hidden download
      </a>
    </Dialog>
  );
};

export { ImageCropDialog };
