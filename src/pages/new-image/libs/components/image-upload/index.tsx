import { PhotoRounded } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useState } from 'react';
import { readFileAsBase64 } from '@/libs/helpers';
import { Trans, useTranslation } from 'react-i18next';

const ImageUpload = () => {
  const { t } = useTranslation('NewImage');

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
              <Trans
                t={t}
                i18nKey="ImageUpload.Title"
                components={{ bold: <b />, underlined: <u /> }}
              />
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
            {t('ImageUpload.SupportedFormats')}: jpeg, png
          </Typography>
          <Typography variant="caption">
            <Trans
              t={t}
              i18nKey="ImageUpload.MaximunSizeMB"
              values={{ value: 25 }}
            />
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export { ImageUpload };
