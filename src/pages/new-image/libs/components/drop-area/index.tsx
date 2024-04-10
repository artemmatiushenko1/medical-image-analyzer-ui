import { mergeSx } from '@/libs/theme';
import { PhotoRounded } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { styles } from './styles';
import { useState } from 'react';

type DropAreaProps = {
  previewImageSrc: string | null;

  onUpload: (file: File) => void;
};

const DropArea = (props: DropAreaProps) => {
  const { previewImageSrc, onUpload } = props;

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { t } = useTranslation('NewImage', { keyPrefix: 'ImageUpload' });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files ?? [];

    if (!file) return;

    onUpload(file);
  };

  return (
    <Stack
      sx={mergeSx(
        styles.root,
        !previewImageSrc && styles.noImage,
        isDraggingOver && styles.draggedOver,
      )}
    >
      {!previewImageSrc && (
        <>
          <PhotoRounded color="primary" sx={styles.imageIcon} />
          <Typography variant="body2" color="text.secondary">
            <Trans
              t={t}
              i18nKey="Title"
              components={{ bold: <b />, underlined: <u /> }}
            />
          </Typography>
          <Box
            component="input"
            type="file"
            sx={styles.input}
            onChange={handleFileInputChange}
            accept="image/png, image/jpeg"
            onDragOver={() => setIsDraggingOver(true)}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={() => setIsDraggingOver(false)}
          />
        </>
      )}
      {previewImageSrc && (
        <Box sx={{ background: '#000', width: '100%', height: '100%' }}>
          <Box
            component="img"
            sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            alt="Some alt text"
            src={previewImageSrc}
          />
        </Box>
      )}
    </Stack>
  );
};

export { DropArea };
