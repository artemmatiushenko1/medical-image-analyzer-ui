import { Button } from '@/libs/components';
import { AddUserRequest } from '@/packages/users';
import { useAddUser } from '@/packages/users/queries';
import { Box, FormControl, FormLabel, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const InviteUserForm = () => {
  const { control, handleSubmit: submit } = useForm<AddUserRequest>({
    defaultValues: { firstName: '', lastName: '', email: '' },
  });

  const { mutate: addUser, isLoading } = useAddUser();

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
        sx={{ alignSelf: 'flex-end', marginTop: 'auto' }}
        variant="contained"
      >
        Add
      </Button>
    </Box>
  );
};

export { InviteUserForm };
