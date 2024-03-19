import { DocumentScannerRounded } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';

const Logo = () => {
  return (
    <Stack direction="row" gap={1} sx={{ padding: '17.5px 25px' }}>
      <DocumentScannerRounded color="error" />
      <Typography>Any Logo Here</Typography>
    </Stack>
  );
};

export { Logo };
