import {
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  alpha,
} from '@mui/material';
import { useState } from 'react';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';

const steps = ['Upload an image', 'Choose diagnostics', 'Finish'];

const NewImage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isOnFinalStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (isOnFinalStep) {
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Stack
        sx={{
          justifyContent: 'center',
          height: 'calc(100% - 67px)',
          gap: 4,
          padding: '10px 50px',
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Stack sx={{ flex: '50%' }}>
            <Typography variant="h6" fontWeight={600}>
              New image analysis
            </Typography>
            <Typography variant="caption">
              Follow the following steps to submit an image for analysis
            </Typography>
          </Stack>
          <Stepper sx={{ flex: '50%' }} activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box display="flex" sx={{ flex: 1 }}>
          <Stack gap={1}>
            <Stack
              sx={{
                gap: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '500px',
                height: '500px',
                border: ({ palette }) => `2px dashed ${palette.primary.main}`,
                background: ({ palette }) =>
                  alpha(palette.primary.main, palette.action.hoverOpacity),
                borderRadius: ({ shape }) => shape.borderRadius,
              }}
            >
              <PhotoRoundedIcon color="primary" sx={{ fontSize: '52px' }} />
              <Typography variant="body2">
                Drag & Drop file here or{' '}
                <b>
                  <u>Choose a file</u>
                </b>
              </Typography>
            </Stack>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption">
                Supported formats: jpeg, png
              </Typography>
              <Typography variant="caption">Maximum size: 25MB</Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Paper
        sx={{
          padding: '14px',
          position: 'absolute',
          width: '100%',
          left: 0,
          bottom: 0,
          borderLeft: 'none',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Box gap={1} display="flex" alignItems="center">
            <Button
              variant="text"
              color="inherit"
              disabled={activeStep <= 0}
              onClick={handleBack}
              startIcon={<KeyboardBackspaceRoundedIcon />}
            >
              Back
            </Button>
            <Button variant="text" color="error">
              Cancel
            </Button>
            <Typography variant="caption">
              Your changes won't be saved
            </Typography>
          </Box>
          <Button
            variant="contained"
            color={isOnFinalStep ? 'success' : 'primary'}
            onClick={handleNext}
            startIcon={isOnFinalStep && <CheckCircleRoundedIcon />}
          >
            {isOnFinalStep ? 'Finish' : 'Next'}
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export { NewImage };
