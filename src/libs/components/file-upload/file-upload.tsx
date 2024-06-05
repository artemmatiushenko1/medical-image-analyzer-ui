import { DropArea } from '@/libs/components';
import { UploadFileRounded } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { SelectedFileCard } from './selected-file-card';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { ValueOf } from '@/libs/types';
import { MimeType } from '@/libs/enums';
import { useTranslation } from 'react-i18next';

type FileUploadProps<T extends FieldValues> = UseControllerProps<T> & {
  allowedMimeTypes: ValueOf<typeof MimeType>[];
  maxFileSizeMb: number;
};

const FileUpload = <T extends FieldValues>(props: FileUploadProps<T>) => {
  const { t } = useTranslation('Common');

  const { allowedMimeTypes = [], maxFileSizeMb, ...controlProps } = props;

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController(controlProps);

  const selectedFile = value as File;

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="subtitle2">
          {t('FileUpload.ChooseFileLabel')}
        </Typography>
        <DropArea
          value={value}
          error={Boolean(error)}
          supportedFormats={allowedMimeTypes}
          icon={UploadFileRounded}
          onUpload={onChange}
          maxFileSizeMb={maxFileSizeMb}
          helperText={error?.message}
        />
      </Stack>
      {selectedFile && (
        <Stack spacing={1}>
          <Typography variant="subtitle2">
            {t('FileUpload.SelectedFileLabel')}
          </Typography>
          <SelectedFileCard
            sizeBytes={selectedFile.size}
            name={selectedFile.name}
            onRemoveFile={() => onChange(undefined)}
          />
        </Stack>
      )}
    </>
  );
};

export { FileUpload };
