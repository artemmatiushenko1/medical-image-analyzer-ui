import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { SyntheticEvent, useCallback, useState } from 'react';
import { StyledReactCrop, styles } from './styles';

import {
  Crop,
  PercentCrop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { CropSettingsForm } from './CropSettingsForm';
import { CropSettingsSection } from './CropSettingsSection';
import { CropSettings } from './types';
import {
  DEFAULT_ASPECT_RATIO,
  DEFAULT_CROP_SETTINGS,
  INITIAL_CROP_WIDTH_PERCENTAGE,
  MIN_CROP_WIDTH_PX,
} from './constants';

type ImageCropDialogProps = {
  open: boolean;
  imgSrc: string;

  onClose: () => void;
};

const ImageCropDialog = (props: ImageCropDialogProps) => {
  const { open, onClose, imgSrc } = props;

  const [crop, setCrop] = useState<Crop>();
  // const [completedCrop, setCompletedCrop] = useState<Crop>();

  const [cropSettings, setCropSettings] = useState<CropSettings>(
    DEFAULT_CROP_SETTINGS,
  );

  const handleCropChange = (_: PixelCrop, percentCrop: PercentCrop) => {
    setCrop(percentCrop);
  };

  // const handleCropComplete = (crop: Crop) => {
  //   setCompletedCrop(crop);
  // };

  const handleCancelButtonClick = () => {
    onClose();
  };

  const handleCropSettingsChange = useCallback((value: CropSettings) => {
    setCropSettings(value);
  }, []);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;

    // sets the initial crop area to min crop
    // width if it's width is <= the min crop width, otherwise to 90% of the image's width
    const cropWidthPercentage = Math.max(
      Math.min((MIN_CROP_WIDTH_PX / width) * 100, 100),
      INITIAL_CROP_WIDTH_PERCENTAGE,
    );

    const crop = makeAspectCrop(
      { unit: '%', width: cropWidthPercentage },
      DEFAULT_ASPECT_RATIO,
      width,
      height,
    );

    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
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
            minWidth={MIN_CROP_WIDTH_PX}
            aspect={DEFAULT_ASPECT_RATIO}
            keepSelection
            onChange={handleCropChange}
            // onComplete={handleCropComplete}
          >
            <img
              src={imgSrc}
              onLoad={handleImageLoad}
              style={{ transform: `scale(${cropSettings.scale})` }}
            />
          </StyledReactCrop>
          <Stack sx={styles.rightPanelRoot}>
            <Stack sx={styles.rightPanel}>
              <CropSettingsSection
                title="Preview"
                content={
                  <Box component="img" src={imgSrc} sx={styles.previewImg} />
                }
              />
              <CropSettingsSection
                title="Settings"
                content={
                  <CropSettingsForm
                    values={cropSettings}
                    onChange={handleCropSettingsChange}
                  />
                }
              />
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
    </Dialog>
  );
};

export { ImageCropDialog };
