import { Box } from '@mui/material';
import logo from '@/assets/logo.png';
import logoIconOnly from '@/assets/logo-icon-only.png';

type LogoProps = {
  iconOnly?: boolean;
};

const Logo = (props: LogoProps) => {
  const { iconOnly } = props;

  const logoImg = iconOnly ? logoIconOnly : logo;

  return (
    <Box
      gap={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '125px',
        height: '23px',
      }}
    >
      <Box
        src={logoImg}
        width="100%"
        height="100%"
        component="img"
        sx={{ alignSelf: 'center', objectFit: 'contain' }}
      />
    </Box>
  );
};

export { Logo };
