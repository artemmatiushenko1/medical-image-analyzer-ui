import { Box } from '@mui/material';
import { styles } from './styles';
import { SignInForm } from './libs/components';
import signInHero from '@/assets/sign-in-hero.png';

const SignIn = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.leftSide}>
        <Box sx={styles.leftSideImage} component="img" src={signInHero} />
      </Box>
      <Box sx={styles.rightSide}>
        <SignInForm />
      </Box>
    </Box>
  );
};

export { SignIn };
