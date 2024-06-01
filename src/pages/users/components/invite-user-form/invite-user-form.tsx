import { Button } from '@/libs/components';
import { AddUserRequest } from '@/packages/users';
import { useAddUser } from '@/packages/users/queries';
import { Box, FormControl, FormLabel, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const InviteUserForm = () => {
  const { t } = useTranslation('Users');

  const { t: tCommon } = useTranslation('Common');

  const { control, handleSubmit: submit } = useForm<AddUserRequest>({
    defaultValues: { firstName: '', lastName: '', email: '' },
  });

  const { mutate: addUser, isPending } = useAddUser();

  const handleSubmit: SubmitHandler<AddUserRequest> = (data) => {
    addUser(data);
  };

  return (
    <Box
      component="form"
      onSubmit={submit(handleSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        height: '100%',
      }}
    >
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 1 }}>
          {t('AddNewUserDrawer.FirstNameLabel')}
        </FormLabel>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <TextField
              placeholder={t('AddNewUserDrawer.FirstNamePlaceholder')}
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 1 }}>
          {t('AddNewUserDrawer.LastNameLabel')}
        </FormLabel>
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextField
              placeholder={t('AddNewUserDrawer.LastNamePlaceholder')}
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 1 }}>
          {t('AddNewUserDrawer.EmailAddressLabel')}
        </FormLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField placeholder="example@mail.com" {...field} />
          )}
        />
      </FormControl>
      <Button
        isLoading={isPending}
        type="submit"
        sx={{ alignSelf: 'flex-end', marginTop: 'auto' }}
        variant="contained"
      >
        {tCommon('Add')}
      </Button>
    </Box>
  );
};

export { InviteUserForm };
