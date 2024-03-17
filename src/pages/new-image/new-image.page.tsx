import {
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const steps = ['Upload an image', 'Choose diagnostics', 'Finish'];

const NewImage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isOnFinalStep = activeStep === steps.length - 1;

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ padding: '20px' }}
      >
        <Stack sx={{ flex: '50%' }}>
          <Typography variant="h6" fontWeight={600}>
            New image analysis
          </Typography>
          <Typography variant="caption">
            Follow the following steps to submit an image for analysis
          </Typography>
        </Stack>
        <Stepper sx={{ flex: '50%' }} activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Paper
        sx={{
          padding: '14px',
          position: 'absolute',
          width: '100%',
          left: 0,
          bottom: 0,
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
