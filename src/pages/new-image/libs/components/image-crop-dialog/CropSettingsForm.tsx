import { CropRotateRounded, ZoomInRounded } from '@mui/icons-material';
import { Box, Checkbox, Slider, Typography } from '@mui/material';
import { styles } from './styles';

const CropSettingsForm = () => {
  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Box sx={styles.settingTitleRoot}>
            <CropRotateRounded sx={styles.settingIcon} />
            <Typography variant="caption">Rotate</Typography>
          </Box>
          <Typography variant="caption">90&deg;</Typography>
        </Box>
        <Slider />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Box sx={styles.settingTitleRoot}>
            <ZoomInRounded sx={styles.settingIcon} />
            <Typography variant="caption">Scale</Typography>
          </Box>
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
