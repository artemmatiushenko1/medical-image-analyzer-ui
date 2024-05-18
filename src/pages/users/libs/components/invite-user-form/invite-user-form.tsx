import { Button } from '@/libs/components';
import { showNotification } from '@/libs/helpers';
import { AddUserRequest, usersApi } from '@/packages/users';
import { Box, FormControl, FormLabel, Stack, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const InviteUserForm = () => {
  const { control, handleSubmit: submit } = useForm<AddUserRequest>({
    defaultValues: { firstName: '', lastName: '', email: '' },
  });

  const { mutate: addUserMutate, isLoading } = useMutation(
    (request: AddUserRequest) => usersApi.addUser(request),
    {
      onSettled: (_, error) =>
        error
          ? showNotification('Failed to add new user.', 'error')
          : showNotification('New user was successfully created.', 'success'),
    },
  );

  const handleSubmit: SubmitHandler<AddUserRequest> = (data) => {
    addUserMutate(data);
  };

  return (
    <Box
      component="form"
      onSubmit={submit(handleSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <Stack direction="row" gap={2}>
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 1 }}>First name</FormLabel>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <TextField placeholder="First name" {...field} />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 1 }}>First name</FormLabel>
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <TextField placeholder="Last name" {...field} />
            )}
          />
        </FormControl>
      </Stack>
      <FormControl fullWidth>
        <FormLabel sx={{ mb: 1 }}>Email address</FormLabel>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField placeholder="example@mail.com" {...field} />
          )}
        />
      </FormControl>
      <Button
        isLoading={isLoading}
        type="submit"
        sx={{ alignSelf: 'flex-end' }}
        variant="contained"
      >
        Add
      </Button>
    </Box>
  );
};

export { InviteUserForm };
