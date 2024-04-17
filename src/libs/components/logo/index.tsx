import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Logo = () => {
  const { t } = useTranslation('App');

  return (
    <Stack
      direction="row"
      gap={1}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '220px',
        width: '100%',
      }}
    >
      <Box
        component="img"
        height="auto"
        width={50}
        sx={{ alignSelf: 'center' }}
        src="https://med.comsys.kpi.ua/images/logo.png"
      />
      <Typography fontSize="10px" fontWeight="600">
        {t('LogoText')}
      </Typography>
    </Stack>
  );
};

export { Logo };
