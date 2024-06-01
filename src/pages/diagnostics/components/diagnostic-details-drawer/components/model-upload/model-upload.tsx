import {
  Button,
  Dialog,
  FileUpload,
  OperationStatusBanner,
} from '@/libs/components';
import { MimeType } from '@/libs/enums';
import {
  CreateModelRequest,
  createModelSchema,
  useCreateModel,
} from '@/packages/diagnostics';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { motion } from 'framer-motion';
import { useDiagnosticsStore } from '@/pages/diagnostics/store';
import { DiagnosticDrawerStage } from '@/pages/diagnostics/libs/enums';

const ModelUpload = () => {
  const selectedDiagnostic = useDiagnosticsStore(
    (state) => state.selectedDiagnostic,
  );

  const navigateUntilStage = useDiagnosticsStore(
    (state) => state.navigateUntilStage,
  );

  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit: sumbit,
  } = useForm<Omit<CreateModelRequest, 'file'> & { file: File }>({
    defaultValues: { name: '' },
    resolver: joiResolver(createModelSchema),
  });

  const { mutate: createModel, isPending, isSuccess } = useCreateModel();

  const handleFormSubmit = sumbit((data) => {
    if (!selectedDiagnostic) return;

    createModel({
      diagnosticId: selectedDiagnostic?.id,
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
            <Typography variant="subtitle2" gutterBottom>
              Model name
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
                  placeholder="Enter model name"
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
              title="New model was successfully uploaded!"
              description={
                <>
                  You can now manage it through <br />
                  diagnostic details view.
                </>
              }
              status="success"
              onOkClick={() =>
                navigateUntilStage(DiagnosticDrawerStage.MODEL_DETAILS)
              }
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

export { ModelUpload };
