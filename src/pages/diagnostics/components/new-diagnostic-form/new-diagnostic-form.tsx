import { Button } from '@/libs/components';
import {
  CreateDiagnosticRequest,
  useCreateDiagnostic,
} from '@/packages/diagnostics';
import { Stack, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type NewDiagnosticFormProps = {
  onSuccess: () => void;
};

const NewDiagnosticForm = (props: NewDiagnosticFormProps) => {
  const { onSuccess } = props;

  const { t } = useTranslation('Diagnostics', {
    keyPrefix: 'NewDiagnosticDialog',
  });

  const { t: tCommon } = useTranslation('Common');

  const { control, handleSubmit: submit } = useForm<CreateDiagnosticRequest>({
    defaultValues: { name: '' },
  });

  const { mutateAsync: createDiagnostic, isPending } = useCreateDiagnostic();

  const handleSubmit: SubmitHandler<CreateDiagnosticRequest> = (data) => {
    createDiagnostic(data).then(onSuccess);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={submit(handleSubmit)}>
      <Stack direction="row">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              label={t('DiagnosticNameLabel')}
              variant="outlined"
              helperText={t('DiagnosticNameHelperText')}
              {...field}
            />
          )}
        />
      </Stack>
      <Button
        type="submit"
        isLoading={isPending}
        sx={{ alignSelf: 'flex-end' }}
        variant="contained"
      >
        {tCommon('Create')}
      </Button>
    </Stack>
  );
};

export { NewDiagnosticForm };
