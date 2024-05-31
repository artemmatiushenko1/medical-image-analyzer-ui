import { Button, Dialog, DropArea } from '@/libs/components';
import { MimeType } from '@/libs/enums';
import { CreateModelRequest, useCreateModel } from '@/packages/diagnostics';
import { UploadFileRounded } from '@mui/icons-material';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SelectedFileCard } from './selected-file-card';
import { ModelUploadSuccessBanner } from './model-upload-success-banner';
import { motion } from 'framer-motion';

const schema = Joi.object({
  name: Joi.string().required(),
  file: Joi.required(),
});

type ModelUploadProps = {
  diagnosticId: string;
};

const ModelUpload = (props: ModelUploadProps) => {
  const { diagnosticId } = props;

  const {
    control,
    formState: { errors },
    handleSubmit: sumbit,
    resetField,
    watch,
  } = useForm<Omit<CreateModelRequest, 'file'> & { file: File }>({
    defaultValues: { name: '' },
    resolver: joiResolver(schema),
  });

  const { mutate: createModel, isLoading, isSuccess } = useCreateModel();

  const handleFormSubmit = sumbit((data) => {
    createModel({ diagnosticId, request: { ...data, file: '' } });
  });

  const selectedFile = watch('file');

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
          <Controller
            name="file"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">
                      Choose model file
                    </Typography>
                    <DropArea
                      value={value}
                      error={Boolean(errors.file)}
                      supportedFormats={[MimeType.HDF5]}
                      icon={UploadFileRounded}
                      previewImageSrc=""
                      onUpload={onChange}
                      maxFileSizeMb={1000}
                      helperText={errors.file?.message}
                    />
                  </Stack>
                  {selectedFile && (
                    <Stack spacing={1}>
                      <Typography variant="subtitle2">Selected file</Typography>
                      <SelectedFileCard
                        sizeBytes={selectedFile.size}
                        name={selectedFile.name}
                        onRemoveFile={() => {
                          resetField('file');
                        }}
                      />
                    </Stack>
                  )}
                </>
              );
            }}
          />
        </Stack>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
            }}
          >
            <ModelUploadSuccessBanner />
          </motion.div>
        )}
      </Dialog.Content>
      {!isSuccess && (
        <Box
          sx={{ padding: '20px 24px', justifyContent: 'end', display: 'flex' }}
        >
          <Button
            isLoading={isLoading}
            variant="contained"
            color="success"
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
