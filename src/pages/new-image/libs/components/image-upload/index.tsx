import { PhotoRounded } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useState } from 'react';
import { readFileAsBase64 } from '@/libs/helpers';

const ImageUpload = () => {
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files ?? [];

    if (!file) return;

    const src = await readFileAsBase64(file);

    if (src) {
      setPreviewImg(src);
    }
  };

  return (
    <Stack sx={styles.root}>
      <Stack sx={styles.dropArea}>
        {!previewImg && (
          <>
            <PhotoRounded color="primary" sx={styles.imageIcon} />
            <Typography variant="body2" color="text.secondary">
              Drag & Drop file here or{' '}
              <b>
                <u>Choose a file</u>
              </b>
            </Typography>
            <Box
              component="input"
              type="file"
              sx={styles.input}
              onChange={handleFileUpload}
              accept="image/png, image/jpeg"
            />
          </>
        )}
        {previewImg && (
          <Box sx={{ background: '#000', width: '100%', height: '100%' }}>
            <Box
              component="img"
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              alt="Some alt text"
              src={previewImg}
            />
          </Box>
        )}
      </Stack>
      {!previewImg && (
        <Box sx={styles.hints}>
          <Typography variant="caption">
            Supported formats: jpeg, png
          </Typography>
          <Typography variant="caption">Maximum size: 25MB</Typography>
        </Box>
      )}
    </Stack>
  );
};

export { ImageUpload };
