import { CropRounded, DeleteOutlineRounded } from '@mui/icons-material';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useState } from 'react';
import { bytesToMb, readFileAsBase64 } from '@/libs/helpers';
import { Trans, useTranslation } from 'react-i18next';
import { DropArea } from '../drop-area';
import { ImageCropDialog } from '../image-crop-dialog';
import { toast } from 'react-toastify';
import {
  MAX_IMAGE_SIZE_MB,
  MIN_IMAGE_DIMENSIONS_PX,
} from '@/pages/new-image/libs/constants';
import { validateImageDimensions } from './helpers';
import { FAKE_IMAGE_UPLOADING_DURATION_MS } from './constants';
import { useNewImageStore } from '@/pages/new-image/new-image.store';

const ImageUpload = () => {
  const { t } = useTranslation('NewImage');

  const uploadedImageSrc = useNewImageStore((state) => state.uploadedImageSrc);
  const croppedImageSrc = useNewImageStore((state) => state.croppedImageSrc);

  const setUploadedImageSrc = useNewImageStore(
    (state) => state.setUploadedImageSrc,
  );
  const setCroppedImageSrc = useNewImageStore(
    (state) => state.setCroppedImageSrc,
  );
  const resetCrop = useNewImageStore((state) => state.resetCrop);

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageCropDialogOpen, setImageCropDialogOpen] = useState(false);

  const currentImage = croppedImageSrc || uploadedImageSrc;

  const handleFileUpload = async (file: File) => {
    setIsImageUploading(true);

    if (bytesToMb(file.size) > MAX_IMAGE_SIZE_MB) {
      setIsImageUploading(false);

      return toast.error(
        `File is too large. Maximum file size is ${MAX_IMAGE_SIZE_MB}MB.`,
      );
    }

    const imageSrc = await readFileAsBase64(file);
    if (!imageSrc) return;

    const areImageDimensionsValid = await validateImageDimensions(imageSrc);

    if (!areImageDimensionsValid) {
      setIsImageUploading(false);

      return toast.error(
        `An image size should be at least ${MIN_IMAGE_DIMENSIONS_PX}px x ${MIN_IMAGE_DIMENSIONS_PX}px.`,
      );
    }

    setTimeout(() => {
      setUploadedImageSrc(imageSrc);
      setIsImageUploading(false);
    }, FAKE_IMAGE_UPLOADING_DURATION_MS);
  };

  const handleDeleteButtonClick = () => {
    resetCrop();
    setUploadedImageSrc(null);
    setCroppedImageSrc(null);
  };

  const handleCropButtonClick = () => {
    setImageCropDialogOpen(true);
  };

  const handleImageCropDialogClose = () => {
    setImageCropDialogOpen(false);
  };

  const handleCrop = (imgUrl: string) => {
    setCroppedImageSrc(imgUrl);
    setImageCropDialogOpen(false);
  };

  return (
    <Stack sx={styles.root}>
      {isImageUploading ? (
        <Skeleton animation="wave" sx={{ transform: 'none' }}>
          <DropArea
            onUpload={handleFileUpload}
            previewImageSrc={uploadedImageSrc}
          />
        </Skeleton>
      ) : (
        <DropArea onUpload={handleFileUpload} previewImageSrc={currentImage} />
      )}
      {!uploadedImageSrc && !isImageUploading && (
        <Box sx={styles.imageUploadHints}>
          <Typography variant="caption">
            {t('ImageUpload.SupportedFormats')}: jpeg, png
          </Typography>
          <Typography variant="caption">
            <Trans
              t={t}
              i18nKey="ImageUpload.MaximunSizeMB"
              values={{ value: MAX_IMAGE_SIZE_MB }}
            />
          </Typography>
        </Box>
      )}
      {uploadedImageSrc && (
        <Box display="flex" justifyContent="space-between">
          <Button
            startIcon={<CropRounded />}
            variant="outlined"
            onClick={handleCropButtonClick}
          >
            Crop
          </Button>
          <Button
            color="error"
            variant="text"
            startIcon={<DeleteOutlineRounded />}
            onClick={handleDeleteButtonClick}
          >
            Delete image
          </Button>
        </Box>
      )}
      {uploadedImageSrc && (
        <ImageCropDialog
          onCrop={handleCrop}
          imgSrc={uploadedImageSrc}
          open={imageCropDialogOpen}
          onClose={handleImageCropDialogClose}
        />
      )}
    </Stack>
  );
};

export { ImageUpload };
