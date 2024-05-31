import { CheckRounded } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

const ModelUploadSuccessBanner = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={3}
      sx={{
        position: 'absolute',
        inset: 0,
        height: '100%',
        background: ({ palette }) => palette.background.paper,
      }}
    >
      <Box
        sx={{
          background: ({ palette }) => palette.success.main,
          borderRadius: '100px',
          color: '#fff',
          padding: 2,
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* TODO: Add fancy checkmark animation */}
        <CheckRounded fontSize="large" />
      </Box>
      <Stack>
        <Typography variant="h6" fontSize={16} textAlign="center" gutterBottom>
          New model was successfully uploaded!
        </Typography>
        <Typography variant="caption" textAlign="center">
          You can now manage it through <br />
          diagnostic details view.
        </Typography>
      </Stack>
      <Button size="small" variant="outlined">
        Ok
      </Button>
    </Stack>
  );
};

export { ModelUploadSuccessBanner };
