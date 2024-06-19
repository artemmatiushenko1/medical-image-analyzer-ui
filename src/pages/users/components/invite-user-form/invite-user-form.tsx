import { Button } from '@/libs/components';
import { showNotification } from '@/libs/helpers';
import { AddUserRequest, addUserSchema } from '@/packages/users';
import { useAddUser } from '@/pages/users/libs/queries';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, FormControl, FormLabel, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const InviteUserForm = () => {
  const { t } = useTranslation('Users');

  const { t: tCommon } = useTranslation('Common');

  const {
    control,
    handleSubmit: submit,
    formState: { errors, isDirty, isValid, isSubmitted },
    reset,
  } = useForm<AddUserRequest>({
    defaultValues: { name: '', email: '' },
    resolver: joiResolver(addUserSchema),
  });

  const { mutateAsync: addUser, isPending } = useAddUser();

  const handleSubmit: SubmitHandler<AddUserRequest> = (data) => {
    void addUser(data).then(() => {
      showNotification(
        `User ${data.name} was successfully added to the system!`,
        'success',
      );

      reset();
    });
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
        <FormLabel sx={{ mb: 1 }}>{t('AddNewUserDrawer.NameLabel')}</FormLabel>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              placeholder={t('AddNewUserDrawer.NamePlaceholder')}
              {...field}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
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
            <TextField
              placeholder="example@mail.com"
              {...field}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          )}
        />
      </FormControl>
      <Button
        isLoading={isPending}
        type="submit"
        disabled={isDirty && !isValid && isSubmitted}
        sx={{ alignSelf: 'flex-end', marginTop: 'auto' }}
        variant="contained"
      >
        {tCommon('Add')}
      </Button>
    </Box>
  );
};

export { InviteUserForm };
