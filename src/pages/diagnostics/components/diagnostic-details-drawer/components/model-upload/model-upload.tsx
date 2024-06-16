import {
  Button,
  Dialog,
  FileUpload,
  OperationStatusBanner,
} from '@/libs/components';
import { MimeType } from '@/libs/enums';
import { CreateModelRequest, createModelSchema } from '@/packages/diagnostics';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { motion } from 'framer-motion';
import { useDiagnosticsStore } from '@/pages/diagnostics/store';
import { Trans, useTranslation } from 'react-i18next';
import { useCreateModel } from '@/pages/diagnostics/libs/queries';

const ModelUpload = () => {
  const { t } = useTranslation('Diagnostics', {
    keyPrefix: 'DiagnosticsDrawer.Stages.NewModel',
  });
  const { t: tCommon } = useTranslation('Common');

  const selectedDiagnostic = useDiagnosticsStore(
    (state) => state.selectedDiagnostic,
  );

  const navigateToPreviousStage = useDiagnosticsStore(
    (state) => state.navigateToPreviousStage,
  );

  const {
    control,
    formState: { errors, isDirty, isValid, isSubmitted },
    handleSubmit: sumbit,
  } = useForm<Omit<CreateModelRequest, 'type' | 'queueName'> & { file: File }>({
    defaultValues: { name: '' },
    resolver: joiResolver(createModelSchema),
  });

  const { mutate: createModel, isPending, isSuccess } = useCreateModel();

  const handleFormSubmit = sumbit((data) => {
    if (!selectedDiagnostic) return;

    const { file, ...createModelPayload } = data;

    createModel({
      ...createModelPayload,
      type: { id: selectedDiagnostic.id },
      queueName: crypto.randomUUID(),
      file,
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
            <Typography variant="subtitle2" gutterBottom>
              {t('ModelNameLabel')}
            </Typography>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  error={Boolean(errors.name)}
                  helperText={errors.name ? errors.name.message : undefined}
                  variant="outlined"
                  fullWidth
                  placeholder={t('ModelNamePlaceholder')}
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
              status="success"
              title={t('SuccessMessageTitle')}
              description={
                <Trans t={t} i18nKey={'SuccessMessageDescription'} />
              }
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
            disabled={isDirty && !isValid && isSubmitted}
            onClick={handleFormSubmit}
          >
            {tCommon('Upload')}
          </Button>
        </Box>
      )}
    </>
  );
};

export { ModelUpload };
