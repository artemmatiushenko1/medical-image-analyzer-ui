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
import { Role } from '@/packages/users';
import { useTranslation } from 'react-i18next';

const SignInForm = () => {
  const { t } = useTranslation('Auth');

  const setUser = useAuthStore((state) => state.setUser);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // TODO: use react hook form
  const [email, setEmail] = useState('');

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUser({
      ...MOCK_USER,
      role: email.includes('admin') ? Role.ADMIN : Role.USER,
    });
  };

  return (
    <Box component="form" sx={styles.form} onSubmit={handleFormSubmit}>
      <Box sx={styles.logoWrapper}>
        <Typography variant="caption">{t('WelcomeTo')}</Typography>
        <Logo />
      </Box>
      <Stack sx={styles.controlsStack}>
        <FormControl sx={styles.formControl}>
          <FormLabel htmlFor="email" sx={styles.formControlLabel}>
            {t('EmailAddress')}
          </FormLabel>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={styles.input}
            id="email"
            placeholder={t('YourEmailAddress')}
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
            {t('Password')}
          </FormLabel>
          <TextField
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={t('YourPassword')}
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
          {t('SignIn')}
        </Button>
        <Typography textAlign="center" variant="caption">
          {t('DontHaveAnAccount')}{' '}
          <Box
            component="a"
            href="#"
            sx={{ color: ({ palette }) => palette.primary.main }}
          >
            {t('RequestAccess')}
          </Box>
        </Typography>
      </Stack>
    </Box>
  );
};

export { SignInForm };
