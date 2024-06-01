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
  useCreateModelVersion,
} from '@/packages/diagnostics';
import { useDiagnosticDrawerStore } from '@/pages/diagnostics/diagnostic-drawer.store';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const VersionUpload = () => {
  const selectedModel = useDiagnosticDrawerStore(
    (state) => state.selectedModel,
  );

  const navigateToPreviousStage = useDiagnosticDrawerStore(
    (state) => state.navigateToPreviousStage,
  );

  const {
    control,
    formState: { errors, isValid, isDirty },
    handleSubmit: sumbit,
  } = useForm<Omit<CreateModelVersionRequest, 'file'> & { file?: File }>({
    defaultValues: { name: '', changelog: '', file: undefined },
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
      request: { ...data, file: '' },
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
              <Typography variant="subtitle2">Version name</Typography>
              <Typography variant="caption">
                Provide a unique name for this version of the AI model.
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
                  placeholder="Enter model name"
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack spacing={1}>
            <Stack>
              <Typography variant="subtitle2">Changelog</Typography>
              <Typography variant="caption">
                Describe the changes or updates made in this version.
              </Typography>
            </Stack>
            <Controller
              control={control}
              name="changelog"
              render={({ field }) => (
                <TextField
                  multiline
                  rows={4}
                  error={Boolean(errors.changelog)}
                  helperText={
                    errors.changelog ? errors.changelog.message : undefined
                  }
                  variant="outlined"
                  fullWidth
                  placeholder="Enter version changelog (optional)"
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
              title="New version was successfully added!"
              description={
                <>
                  You can now view or manage the new <br />
                  version of the AI model.
                </>
              }
              status="success"
              okText="Back to versions"
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
            disabled={isDirty && !isValid}
            onClick={handleFormSubmit}
          >
            Upload
          </Button>
        </Box>
      )}
    </>
  );
};

export { VersionUpload };
