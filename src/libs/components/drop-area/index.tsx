import { mergeSx } from '@/libs/theme';
import {
  Box,
  FormHelperText,
  Stack,
  SvgIconProps,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { styles } from './styles';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { MimeType } from '@/libs/enums';
import { ValueOf } from '@/libs/types';
import { bytesToMb, parseMimeType, showNotification } from '@/libs/helpers';

type DropAreaProps = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  icon: React.FC<SvgIconProps>;
  maxFileSizeMb: number;
  supportedFormats: ValueOf<typeof MimeType>[];
  error?: boolean;
  helperText?: string;
  value?: File;

  onUpload: (file: File) => void;
};

const DropArea = (props: DropAreaProps) => {
  const {
    onUpload,
    height,
    width,
    icon: Icon,
    maxFileSizeMb,
    supportedFormats,
    error = false,
    helperText,
    value,
  } = props;

  const { t } = useTranslation('NewStudy', { keyPrefix: 'ImageUpload' });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const isDownToMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

  useEffect(() => {
    if (!value && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [value]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files ?? [];

    if (!file) return;

    if (bytesToMb(file.size) > maxFileSizeMb) {
      return showNotification(
        `File is too large. Maximum file size is ${maxFileSizeMb}MB.`,
        'error',
      );
    }

    onUpload(file);
  };

  return (
    <Stack gap={1}>
      <Stack
        sx={mergeSx(
          styles.root,
          isDraggingOver && styles.draggedOver,
          error && styles.error,
          {
            height,
            maxWidth: width,
            width: '100%',
            p: 4,
          },
          !isDownToMediumScreen && {
            height: 'auto',
            aspectRatio: '1 / 1',
          },
        )}
      >
        <Icon color="primary" sx={styles.imageIcon} />
        <Typography variant="body2" color="text.secondary" textAlign="center">
          <Trans
            t={t}
            i18nKey="Title"
            components={{ bold: <b />, underlined: <u /> }}
          />
        </Typography>
        <Box
          ref={fileInputRef}
          component="input"
          type="file"
          sx={styles.input}
          onChange={handleFileInputChange}
          accept={supportedFormats.join(', ')}
          onDragOver={() => setIsDraggingOver(true)}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={() => setIsDraggingOver(false)}
        />
      </Stack>
      <Box sx={styles.imageUploadHints}>
        <Typography variant="caption">
          {t('SupportedFormats')}:{' '}
          {supportedFormats
            ?.map((mimeType) => parseMimeType(mimeType).subType)
            .join(', ')}
        </Typography>
        {maxFileSizeMb && (
          <Typography variant="caption">
            <Trans
              t={t}
              i18nKey="MaximunSizeMB"
              values={{ value: maxFileSizeMb }}
            />
          </Typography>
        )}
      </Box>
      {helperText && (
        <FormHelperText sx={{ ml: '14px' }} error>
          {helperText}
        </FormHelperText>
      )}
    </Stack>
  );
};

export { DropArea };
