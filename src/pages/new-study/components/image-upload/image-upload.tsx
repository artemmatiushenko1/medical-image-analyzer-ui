import {
  CropRounded,
  DeleteOutlineRounded,
  PhotoRounded,
} from '@mui/icons-material';
import { Box, Button, Skeleton, Stack } from '@mui/material';
import { styles } from './styles';
import { useState } from 'react';
import { readFileAsBase64, showNotification } from '@/libs/helpers';
import { DropArea } from '@/libs/components/drop-area';
import { ImageCropDialog } from '../image-crop-dialog';
import {
  MAX_IMAGE_SIZE_MB,
  MIN_IMAGE_DIMENSIONS_PX,
} from '@/pages/new-study/libs/constants';
import { validateImageDimensions } from './helpers';
import { FAKE_IMAGE_UPLOADING_DURATION_MS } from './constants';
import { useNewStudyStore } from '@/pages/new-study/store';
import { MimeType } from '@/libs/enums';
import { useTranslation } from 'react-i18next';

const ImageUpload = () => {
  const { t } = useTranslation('NewStudy');

  const uploadedImageSrc = useNewStudyStore((state) => state.uploadedImageSrc);
  const croppedImageSrc = useNewStudyStore((state) => state.croppedImageSrc);

  const setUploadedImageSrc = useNewStudyStore(
    (state) => state.setUploadedImageSrc,
  );
  const setCroppedImageSrc = useNewStudyStore(
    (state) => state.setCroppedImageSrc,
  );
  const resetCrop = useNewStudyStore((state) => state.resetCrop);

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageCropDialogOpen, setImageCropDialogOpen] = useState(false);

  const currentImage = croppedImageSrc || uploadedImageSrc;

  const handleFileUpload = async (file: File) => {
    setIsImageUploading(true);

    const imageSrc = await readFileAsBase64(file);
    if (!imageSrc) return;

    const areImageDimensionsValid = await validateImageDimensions(imageSrc);

    if (!areImageDimensionsValid) {
      setIsImageUploading(false);

      return showNotification(
        `An image size should be at least ${MIN_IMAGE_DIMENSIONS_PX}px x ${MIN_IMAGE_DIMENSIONS_PX}px.`,
        'error',
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
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            transform: 'none',
            aspectRatio: 1 / 1,
            width: '100%',
            maxWidth: '450px',
          }}
        >
          <DropArea
            width="450px"
            height="450px"
            icon={PhotoRounded}
            onUpload={handleFileUpload}
            supportedFormats={[MimeType.JPEG, MimeType.PNG]}
            maxFileSizeMb={MAX_IMAGE_SIZE_MB}
          />
        </Skeleton>
      ) : (
        !currentImage && (
          <DropArea
            width="450px"
            height="450px"
            icon={PhotoRounded}
            onUpload={handleFileUpload}
            supportedFormats={[MimeType.JPEG, MimeType.PNG]}
            maxFileSizeMb={MAX_IMAGE_SIZE_MB}
          />
        )
      )}
      {currentImage && (
        <Box sx={styles.uploadedImgWrapper}>
          <Box
            component="img"
            alt="Uploaded image"
            src={currentImage}
            sx={styles.uploadedImg}
          />
        </Box>
      )}
      {uploadedImageSrc && (
        <Box display="flex" justifyContent="space-between">
          <Button startIcon={<CropRounded />} onClick={handleCropButtonClick}>
            {t('CropImage')}
          </Button>
          <Button
            color="error"
            variant="text"
            startIcon={<DeleteOutlineRounded />}
            onClick={handleDeleteButtonClick}
          >
            {t('DeleteImage')}
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
