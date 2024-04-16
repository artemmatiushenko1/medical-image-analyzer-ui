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
} from '../../../libs/constants';
import { validateImageDimensions } from './helpers';
import { FAKE_IMAGE_UPLOADING_DURATION_MS } from './constants';

const ImageUpload = () => {
  const { t } = useTranslation('NewImage');

  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageCropDialogOpen, setImageCropDialogOpen] = useState(false);

  const currentImage = croppedImg || previewImg;

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
      setPreviewImg(imageSrc);
      setIsImageUploading(false);
    }, FAKE_IMAGE_UPLOADING_DURATION_MS);
  };

  const handleDeleteButtonClick = () => {
    setPreviewImg(null);
    setCroppedImg(null);
  };

  const handleCropButtonClick = () => {
    setImageCropDialogOpen(true);
  };

  const handleImageCropDialogClose = () => {
    setImageCropDialogOpen(false);
  };

  const handleCrop = (imgUrl: string) => {
    setCroppedImg(imgUrl);
    setImageCropDialogOpen(false);
  };

  return (
    <Stack sx={styles.root}>
      {isImageUploading ? (
        <Skeleton animation="wave" sx={{ transform: 'none' }}>
          <DropArea onUpload={handleFileUpload} previewImageSrc={previewImg} />
        </Skeleton>
      ) : (
        <DropArea onUpload={handleFileUpload} previewImageSrc={currentImage} />
      )}

      {!previewImg && !isImageUploading && (
        <Box sx={styles.hints}>
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
      {previewImg && (
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
      {previewImg && (
        <ImageCropDialog
          imgSrc={previewImg}
          onCrop={handleCrop}
          open={imageCropDialogOpen}
          onClose={handleImageCropDialogClose}
        />
      )}
    </Stack>
  );
};

export { ImageUpload };
