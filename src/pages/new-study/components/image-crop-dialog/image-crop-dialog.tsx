import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { useRef } from 'react';
import { styles } from './styles';
// import { CropSettingsForm } from './crop-settings-form';
import { CropSettingsSection } from './crop-settings-section';
import { useNewStudyStore } from '@/pages/new-study/store';
import { useTranslation } from 'react-i18next';

import {
  Cropper,
  CropperPreview,
  CropperPreviewRef,
  CropperRef,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { MIN_CROP_WIDTH_PX } from './constants';

type ImageCropDialogProps = {
  open: boolean;
  imgSrc: string;

  onClose: () => void;
  onCrop: (imgUrl: string) => void;
};

const StyledCropPreview = styled(CropperPreview)(() => ({
  width: '100%',
  height: '100%',
}));

const ImageCropDialog = (props: ImageCropDialogProps) => {
  const { open, onClose, imgSrc, onCrop } = props;

  const { t } = useTranslation('NewStudy');
  const { t: tCommon } = useTranslation('Common');

  const cropSettings = useNewStudyStore((state) => state.cropSettings);

  const setCropSettings = useNewStudyStore((state) => state.setCropSettings);

  const cropperRef = useRef<CropperRef>(null);

  const previewRef = useRef<CropperPreviewRef>(null);

  const handleCancelButtonClick = () => {
    onClose();
  };

  // const handleCropSettingsChange = useCallback(
  //   (value: CropSettings) => {
  //     setCropSettings(value);
  //   },
  //   [setCropSettings],
  // );

  const onUpdate = (cropper: CropperRef) => {
    previewRef.current?.update(cropper);

    const coords = cropper.getCoordinates();

    if (!coords) {
      return;
    }

    setCropSettings(coords);
  };

  const handleCropSave = () => {
    const croppedImg = cropperRef.current?.getCanvas()?.toDataURL();

    if (!croppedImg) {
      return null;
    }

    onCrop(croppedImg);
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: styles.rootPaper }}>
      <DialogTitle>
        <Typography variant="body1" fontWeight={600}>
          {t('CropDialog.Title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={styles.dialogContentWrapper}>
          <Box sx={{ maxHeight: '500px', maxWidth: '500px', width: '100%' }}>
            <Cropper
              src={imgSrc}
              className={'cropper'}
              ref={cropperRef}
              onUpdate={onUpdate}
              defaultCoordinates={cropSettings}
              minWidth={MIN_CROP_WIDTH_PX}
              minHeight={MIN_CROP_WIDTH_PX}
            />
          </Box>
          <Stack sx={styles.rightPanelRoot}>
            <Stack sx={styles.rightPanel}>
              <CropSettingsSection
                title={t('CropDialog.Preview')}
                content={
                  <Box sx={styles.cropPreviewRoot}>
                    <StyledCropPreview ref={previewRef} />
                  </Box>
                }
              />
              {/* <CropSettingsSection
                title={t('CropDialog.Settings')}
                content={
                  <CropSettingsForm
                    values={cropSettings}
                    onChange={handleCropSettingsChange}
                  />
                }
              /> */}
            </Stack>
            <DialogActions>
              <Button color="error" onClick={handleCancelButtonClick}>
                {tCommon('Cancel')}
              </Button>
              <Button variant="contained" onClick={handleCropSave}>
                {tCommon('Save')}
              </Button>
            </DialogActions>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export { ImageCropDialog };
