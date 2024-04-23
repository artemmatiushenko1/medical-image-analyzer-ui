import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { styles } from './styles';
import { Logo } from '@/libs/components';
import { FormEvent, useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { User } from '@/packages/users';

const MOCK_USER: User = {
  email: 'artom.matyushenko@classtim.com',
  firstName: 'Artem',
  lastName: 'Matiushenko',
};

const SignInForm = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUser(MOCK_USER);
  };

  return (
    <Box component="form" sx={styles.form} onSubmit={handleFormSubmit}>
      <Box sx={styles.logoWrapper}>
        <Typography variant="caption">Welcome to</Typography>
        <Logo />
      </Box>
      <Stack sx={styles.controlsStack}>
        <FormControl sx={styles.formControl}>
          <FormLabel htmlFor="email" sx={styles.formControlLabel}>
            Email address
          </FormLabel>
          <TextField id="email" placeholder="Your email address" />
        </FormControl>
        <FormControl sx={styles.formControl}>
          <FormLabel htmlFor="password" sx={styles.formControlLabel}>
            Password
          </FormLabel>
          <TextField
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Your password"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handlePasswordVisibilityToggle}>
                  {isPasswordVisible ? (
                    <VisibilityOffRounded />
                  ) : (
                    <VisibilityRounded />
                  )}
                </IconButton>
              ),
            }}
          />
        </FormControl>
        <Button
          type="submit"
          sx={styles.signInButton}
          variant="contained"
          size="large"
        >
          Sign in
        </Button>
      </Stack>
    </Box>
  );
};

export { SignInForm };
