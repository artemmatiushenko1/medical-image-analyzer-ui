import {
  Button,
  Dialog,
  FileUpload,
  OperationStatusBanner,
} from '@/libs/components';
import { MimeType } from '@/libs/enums';
import {
  CreateModelVersionRequest,
  createModelVersionSchema,
} from '@/packages/diagnostics';
import { useDiagnosticsStore } from '@/pages/diagnostics/store';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';
import { useCreateModelVersion } from '@/pages/diagnostics/libs/queries';

const VersionUpload = () => {
  const { t } = useTranslation('Diagnostics', {
    keyPrefix: 'DiagnosticsDrawer.Stages.NewVersion',
  });

  const { t: tCommon } = useTranslation('Common');

  const selectedModel = useDiagnosticsStore((state) => state.selectedModel);

  const navigateToPreviousStage = useDiagnosticsStore(
    (state) => state.navigateToPreviousStage,
  );

  const {
    control,
    formState: { errors, isValid, isSubmitted },
    handleSubmit: sumbit,
  } = useForm<CreateModelVersionRequest>({
    defaultValues: { name: '', description: '', file: undefined },
    resolver: joiResolver(createModelVersionSchema),
    reValidateMode: 'onChange',
  });

  const {
    mutate: createModelVersion,
    isPending,
    isSuccess,
  } = useCreateModelVersion();

  const handleFormSubmit = sumbit((data) => {
    if (!selectedModel) return;

    createModelVersion({
      modelId: selectedModel.id,
      request: data,
    });
  });

  return (
    <>
      <Dialog.Content
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          position: 'relative',
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Stack>
              <Typography variant="subtitle2">
                {t('VersionNameLabel')}
              </Typography>
              <Typography variant="caption">
                {t('VersionNameCaption')}
              </Typography>
            </Stack>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  required
                  error={Boolean(errors.name)}
                  helperText={errors.name ? errors.name.message : undefined}
                  variant="outlined"
                  fullWidth
                  placeholder={t('VersionNamePlaceholder')}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack spacing={1}>
            <Stack>
              <Typography variant="subtitle2">{t('ChangelogLabel')}</Typography>
              <Typography variant="caption">{t('ChangelogCaption')}</Typography>
            </Stack>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField
                  multiline
                  rows={4}
                  error={Boolean(errors.description)}
                  helperText={
                    errors.description ? errors.description.message : undefined
                  }
                  variant="outlined"
                  fullWidth
                  placeholder={t('ChangelogPlaceholder')}
                  {...field}
                />
              )}
            />
          </Stack>
          <FileUpload
            name="file"
            control={control}
            allowedMimeTypes={[MimeType.HDF5]}
            maxFileSizeMb={1000}
          />
        </Stack>
        {isSuccess && (
          <motion.div
            initial="initial"
            animate="finished"
            variants={{ initial: { opacity: 0 }, finished: { opacity: 1 } }}
            transition={{
              duration: 0.2,
            }}
          >
            <OperationStatusBanner
              title={t('SuccessMessageTitle')}
              description={
                <Trans t={t} i18nKey={'SuccessMessageDescription'} />
              }
              status="success"
              okText={t('SuccessMessageOkButton')}
              onOkClick={() => navigateToPreviousStage()}
            />
          </motion.div>
        )}
      </Dialog.Content>
      {!isSuccess && (
        <Box
          sx={{ padding: '20px 24px', justifyContent: 'end', display: 'flex' }}
        >
          <Button
            isLoading={isPending}
            variant="contained"
            color="success"
            disabled={!isValid && isSubmitted}
            onClick={handleFormSubmit}
          >
            {tCommon('Upload')}
          </Button>
        </Box>
      )}
    </>
  );
};

export { VersionUpload };
