import {
  AlternateEmailRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styles } from './styles';
import { Button, Logo } from '@/libs/components';
import { useState } from 'react';
import { SignInRequest, signInSchema } from '@/packages/auth';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useSignIn } from '../../libs/queries';

const SignInForm = () => {
  const { t } = useTranslation('Auth');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit: submit,
    formState: { errors },
  } = useForm<SignInRequest>({
    defaultValues: { email: '', password: '' },
    resolver: joiResolver(signInSchema),
  });

  const { mutate: signIn, isPending } = useSignIn();

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible((prevIsVisible) => !prevIsVisible);
  };

  const handleFormSubmit = submit((data: SignInRequest) => {
    signIn(data);
  });

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
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                sx={styles.input}
                id="email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                placeholder={t('YourEmailAddress')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ pr: 0.5 }}>
                      <AlternateEmailRounded />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormControl>
        <FormControl sx={styles.formControl}>
          <FormLabel htmlFor="password" sx={styles.formControlLabel}>
            {t('Password')}
          </FormLabel>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                id="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
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
            )}
          />
        </FormControl>
        <Button
          size="large"
          type="submit"
          variant="contained"
          isLoading={isPending}
          sx={styles.signInButton}
        >
          {t('SignIn')}
        </Button>
        <Typography textAlign="center" variant="caption">
          {t('DontHaveAnAccount')}{' '}
          <Box
            href="#"
            component="a"
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
