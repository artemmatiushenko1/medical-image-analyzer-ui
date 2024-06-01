import { Button, Dialog, FileUpload } from '@/libs/components';
import { MimeType } from '@/libs/enums';
import { CreateModelRequest, useCreateModel } from '@/packages/diagnostics';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
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
  } = useForm<Omit<CreateModelRequest, 'file'> & { file: File }>({
    defaultValues: { name: '' },
    resolver: joiResolver(schema),
  });

  const { mutate: createModel, isPending, isSuccess } = useCreateModel();

  const handleFormSubmit = sumbit((data) => {
    createModel({ diagnosticId, request: { ...data, file: '' } });
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
            <ModelUploadSuccessBanner />
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
