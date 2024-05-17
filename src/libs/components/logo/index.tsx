import { Box } from '@mui/material';
import logo from '@/assets/logo.png';

const Logo = () => {
  return (
    <Box
      gap={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '125px',
        width: '100%',
        height: '23px',
      }}
    >
      <Box
        src={logo}
        width="100%"
        height="auto"
        component="img"
        sx={{ alignSelf: 'center' }}
      />
    </Box>
  );
};

export { Logo };
