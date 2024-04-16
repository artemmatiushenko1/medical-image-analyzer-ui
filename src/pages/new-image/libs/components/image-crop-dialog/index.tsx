import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { StyledReactCrop, styles } from './styles';

import {
  Crop,
  PercentCrop,
  PixelCrop,
  centerCrop,
  convertToPixelCrop,
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
import { CropPreview, CropPreviewRef } from './CropPreview';

type ImageCropDialogProps = {
  open: boolean;
  imgSrc: string;

  onClose: () => void;
  onCrop: (imgUrl: string) => void;
};

const ImageCropDialog = (props: ImageCropDialogProps) => {
  const { open, onClose, imgSrc, onCrop } = props;

  const [crop, setCrop] = useState<Crop>();
  const [isSavingCrop, setIsSavingCrop] = useState(false);
  const [completedCrop, setCompletedCrop] = useState<PercentCrop>();
  const [cropSettings, setCropSettings] = useState<CropSettings>(
    DEFAULT_CROP_SETTINGS,
  );

  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropPreviewRef = useRef<CropPreviewRef | null>(null);

  const handleCropChange = (_: PixelCrop, percentCrop: PercentCrop) => {
    setCrop(percentCrop);
  };

  const handleCropComplete = (_: PixelCrop, percentCrop: PercentCrop) => {
    setCompletedCrop(percentCrop);
  };

  const handleCancelButtonClick = () => {
    onClose();
  };

  const handleCropSettingsChange = useCallback((value: CropSettings) => {
    setCropSettings(value);
  }, []);

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;

    // sets the initial crop area to min crop width
    // if image's width is <= min crop width, otherwise to 90% of the image's width
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
    setCompletedCrop(centeredCrop);
  };

  const handleCropSave = async () => {
    if (!cropPreviewRef.current) return;

    setIsSavingCrop(true);
    const croppedImg = await cropPreviewRef.current.exportImage();
    setIsSavingCrop(false);

    if (croppedImg) {
      onCrop(croppedImg);
    }
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
            keepSelection
            crop={crop}
            onChange={handleCropChange}
            minWidth={MIN_CROP_WIDTH_PX}
            minHeight={MIN_CROP_WIDTH_PX}
            // aspect={cropSettings.aspectRatio}
            aspect={DEFAULT_ASPECT_RATIO}
            onComplete={handleCropComplete}
          >
            <img
              src={imgSrc}
              ref={imageRef}
              onLoad={handleImageLoad}
              style={{ transform: `scale(${cropSettings.scale})` }}
            />
          </StyledReactCrop>
          <Stack sx={styles.rightPanelRoot}>
            <Stack sx={styles.rightPanel}>
              {imageRef.current && completedCrop && (
                <CropSettingsSection
                  title="Preview"
                  content={
                    <CropPreview
                      ref={cropPreviewRef}
                      imgElement={imageRef.current}
                      cropSettings={cropSettings}
                      pixelCrop={convertToPixelCrop(
                        completedCrop,
                        imageRef.current.width,
                        imageRef.current.height,
                      )}
                    />
                  }
                />
              )}
              {crop && (
                <CropSettingsSection
                  title="Settings"
                  content={
                    <CropSettingsForm
                      crop={crop}
                      values={cropSettings}
                      onChange={handleCropSettingsChange}
                    />
                  }
                />
              )}
            </Stack>
            <DialogActions>
              <Button
                disabled={isSavingCrop}
                color="error"
                onClick={handleCancelButtonClick}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={isSavingCrop}
                onClick={handleCropSave}
                startIcon={
                  isSavingCrop && (
                    <CircularProgress color="inherit" size="12px" />
                  )
                }
              >
                Save
              </Button>
            </DialogActions>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export { ImageCropDialog };
