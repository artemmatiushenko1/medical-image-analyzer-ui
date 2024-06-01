import {
  AlternateEmailRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { styles } from './styles';
import { Logo } from '@/libs/components';
import { FormEvent, useState } from 'react';
import { MOCK_USER, useAuthStore } from '@/packages/auth';
import { Link } from 'react-router-dom';
import { palette } from '@/libs/theme/palette';

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
          <TextField
            sx={styles.input}
            id="email"
            placeholder="Your email address"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ pr: 0.5 }}>
                  <AlternateEmailRounded />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={styles.formControl}>
          <FormLabel htmlFor="password" sx={styles.formControlLabel}>
            Password
          </FormLabel>
          <TextField
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Your password"
            sx={styles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ mr: -0.5 }}>
                  <IconButton
                    color="inherit"
                    onClick={handlePasswordVisibilityToggle}
                  >
                    {isPasswordVisible ? (
                      <VisibilityOffRounded />
                    ) : (
                      <VisibilityRounded />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button
          type="submit"
          size="large"
          variant="contained"
          sx={styles.signInButton}
        >
          Sign in
        </Button>
        <Typography textAlign="center" variant="caption">
          Don't have an account?{' '}
          <Link to="#" style={{ color: palette.primary.main }}>
            Request access
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export { SignInForm };
