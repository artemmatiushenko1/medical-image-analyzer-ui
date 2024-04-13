import { Box, Checkbox, Slider, Typography } from '@mui/material';

const CropSettingsForm = () => {
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption">Rotate</Typography>
          <Typography variant="caption">90&deg;</Typography>
        </Box>
        <Slider />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption">Scale</Typography>
          <Typography variant="caption">90%</Typography>
        </Box>
        <Slider />
      </Box>
      <Box>
        <Checkbox />
        <Typography variant="caption">Preserve aspect ratio</Typography>
      </Box>
    </>
  );
};

export { CropSettingsForm };
