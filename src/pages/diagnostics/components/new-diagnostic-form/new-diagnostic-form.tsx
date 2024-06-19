import { Button } from '@/libs/components';
import {
  CreateDiagnosticRequest,
  createDiagnosticSchema,
} from '@/packages/diagnostics';
import { Stack, TextField, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCreateDiagnostic } from '../../libs/queries';
import { joiResolver } from '@hookform/resolvers/joi';

type NewDiagnosticFormProps = {
  onSuccess: () => void;
};

const NewDiagnosticForm = (props: NewDiagnosticFormProps) => {
  const { onSuccess } = props;

  const { t } = useTranslation('Diagnostics', {
    keyPrefix: 'NewDiagnosticDialog',
  });

  const { t: tCommon } = useTranslation('Common');

  const {
    control,
    handleSubmit: submit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<CreateDiagnosticRequest>({
    defaultValues: { name: '', description: '' },
    resolver: joiResolver(createDiagnosticSchema),
  });

  const { mutateAsync: createDiagnostic, isPending } = useCreateDiagnostic();

  const handleSubmit: SubmitHandler<CreateDiagnosticRequest> = (data) => {
    void createDiagnostic(data).then(onSuccess);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={submit(handleSubmit)}>
      <Typography variant="caption">
        Please fill in this form to create new diagnostic type
      </Typography>
      <Stack gap={2}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label={t('DiagnosticNameLabel')}
              variant="outlined"
              placeholder="Enter name"
              helperText={
                errors.name
                  ? errors.name.message
                  : t('DiagnosticNameHelperText')
              }
              {...field}
              error={Boolean(errors.name)}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              placeholder="Enter description (optional)"
              variant="outlined"
              helperText={
                errors.description ? errors.description.message : null
              }
              {...field}
              error={Boolean(errors.description)}
            />
          )}
        />
      </Stack>
      <Button
        type="submit"
        isLoading={isPending}
        disabled={!isValid && isSubmitted}
        sx={{ alignSelf: 'flex-end' }}
        variant="contained"
      >
        {tCommon('Create')}
      </Button>
    </Stack>
  );
};

export { NewDiagnosticForm };
