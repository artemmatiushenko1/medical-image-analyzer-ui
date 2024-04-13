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
import { StyledReactCrop, styles } from './styles';

import { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type ImageCropDialogProps = {
  open: boolean;
  imgSrc: string;

  onClose: () => void;
};

console.log({ styles });

const ImageCropDialog = (props: ImageCropDialogProps) => {
  const { open, onClose, imgSrc } = props;

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

  const handleCancelButtonClick = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: styles.rootPaper }}>
      <DialogTitle>
        <Typography variant="body1" fontWeight={600}>
          Crop image
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={styles.dialogContentWrapper}>
          <StyledReactCrop
            crop={crop}
            onChange={handleCropChange}
            onComplete={handleCropComplete}
          >
            <img src={imgSrc} />
          </StyledReactCrop>
          <Stack sx={styles.rightPanelRoot}>
            <Stack sx={styles.rightPanel}>
              <Stack sx={styles.previewRoot}>
                <Typography variant="subtitle2">Preview</Typography>
                <Box component="img" src={imgSrc} sx={styles.previewImg} />
              </Stack>
              <Stack sx={styles.settingsRoot}>
                <Typography variant="subtitle2">Settings</Typography>
                <Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="caption">Rotate</Typography>
                    <Typography variant="caption">90&deg;</Typography>
                  </Box>
                  <Slider />
                </Box>
                <Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="caption">Scale</Typography>
                    <Typography variant="caption">90%</Typography>
                  </Box>
                  <Slider />
                </Box>
                <Box>
                  <Checkbox />
                  <Typography variant="caption">
                    Preserve aspect ratio
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <DialogActions>
              <Button color="error" onClick={handleCancelButtonClick}>
                Cancel
              </Button>
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
