import { Box, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { SignInForm } from './components';
import signInHero from '@/assets/sign-in-hero.png';

const SignIn = () => {
  return (
    <Box sx={styles.root}>
      <Stack sx={styles.leftSide}>
        <Box sx={styles.leftSideImage} component="img" src={signInHero} />
        <Typography sx={styles.motto}>AI Vision for Your Health</Typography>
      </Stack>
      <Box sx={styles.rightSide}>
        <SignInForm />
      </Box>
    </Box>
  );
};

export { SignIn };
