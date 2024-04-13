import { ZoomInRounded } from '@mui/icons-material';
import { Box, Checkbox, Slider, Typography } from '@mui/material';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { CropSettings } from './types';
import {
  DEFAULT_CROP_SETTINGS,
  MAX_SCALE,
  MIN_SCALE,
  SCALE_STEP,
} from './constants';
import { getScalePercentageString } from './helpers';

type CropSettingsFormProps = {
  values: CropSettings;
  onChange: (values: CropSettings) => void;
};

const CropSettingsForm = (props: CropSettingsFormProps) => {
  const { values, onChange } = props;

  const { control, watch } = useForm<CropSettings>({
    defaultValues: { ...DEFAULT_CROP_SETTINGS, ...values },
    mode: 'onChange',
  });

  const scale = watch('scale');
  const rotation = watch('rotation');
  const preserveAspectRatio = watch('preserveAspectRatio');

  useEffect(() => {
    onChange({ rotation, scale, preserveAspectRatio });
  }, [rotation, scale, preserveAspectRatio, onChange]);

  return (
    <>
      {/* <Box>
        <Box display="flex" justifyContent="space-between">
          <Box sx={styles.settingTitleRoot}>
            <CropRotateRounded sx={styles.settingIcon} />
            <Typography variant="caption">Rotate</Typography>
          </Box>
          <Typography variant="caption">90&deg;</Typography>
        </Box>
        <Controller
          control={control}
          name="rotation"
          render={({ field }) => <Slider {...field} />}
        />
      </Box> */}
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Box sx={styles.settingTitleRoot}>
            <ZoomInRounded sx={styles.settingIcon} />
            <Typography variant="caption">Scale</Typography>
          </Box>
          <Typography variant="caption">
            {getScalePercentageString(scale)}
          </Typography>
        </Box>
        <Controller
          control={control}
          name="scale"
          render={({ field }) => (
            <Slider
              min={MIN_SCALE}
              max={MAX_SCALE}
              step={SCALE_STEP}
              {...field}
            />
          )}
        />
      </Box>
      <Box>
        <Controller
          control={control}
          name="preserveAspectRatio"
          render={({ field }) => <Checkbox {...field} />}
        />
        <Typography variant="caption">Preserve aspect ratio</Typography>
      </Box>
    </>
  );
};

export { CropSettingsForm };
