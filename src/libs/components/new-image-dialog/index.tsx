import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  alpha,
} from '@mui/material';
import { useState } from 'react';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import { useUiStore } from '@/stores/ui.store';

const steps = ['Upload an image', 'Choose diagnostics', 'Confirm'];

const NewImageDialog = () => {
  const open = useUiStore((state) => state.newImageDialogOpen);
  const toggleNewImageDialogOpen = useUiStore(
    (state) => state.toggleNewImageDialogOpen,
  );
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
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      sx={{ '.MuiDialog-paper': { maxWidth: '1100px' } }}
    >
      <DialogTitle>
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
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" gap={10} sx={{ padding: '15px 0' }}>
          <Stack gap={1} width="450px">
            <Stack
              sx={{
                gap: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '450px',
                border: ({ palette }) => `2px dashed ${palette.primary.main}`,
                background: ({ palette }) =>
                  alpha(palette.primary.main, palette.action.hoverOpacity),
                borderRadius: ({ shape }) => shape.borderRadius,
              }}
            >
              <PhotoRoundedIcon color="primary" sx={{ fontSize: '52px' }} />
              <Typography variant="body2" color="text.secondary">
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
          <Stack flex={1} gap={4}>
            <Stack gap={1}>
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  Patient Information
                </Typography>
                <Typography variant="caption">
                  Provide any available information
                </Typography>
              </Box>
              <TextField variant="filled" label="Full name" />
              <Box display="flex" gap={1}>
                <TextField
                  sx={{ '&.MuiFormControl-root': { flex: 0.5 } }}
                  variant="filled"
                  label="Phone number"
                />
                <TextField sx={{ flex: 0.5 }} variant="filled" label="Age" />
              </Box>
              <FormControl variant="filled" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack gap={1}>
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  Image Information
                </Typography>
                <Typography variant="caption">
                  Provide any available image metadata, some of the options are
                  alredy pre-filled
                </Typography>
              </Box>
              <TextField variant="filled" label="Full name" />
              <Box display="flex" gap={1}>
                <TextField
                  sx={{ '&.MuiFormControl-root': { flex: 0.5 } }}
                  variant="filled"
                  label="Phone number"
                />
                <TextField sx={{ flex: 0.5 }} variant="filled" label="Age" />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          padding: '14px',
        }}
      >
        <Stack direction="row" width="100%" justifyContent="space-between">
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
            <Button
              variant="text"
              color="error"
              onClick={() => toggleNewImageDialogOpen()}
            >
              Cancel
            </Button>
          </Box>
          <Button
            variant="contained"
            onClick={handleNext}
            color={isOnFinalStep ? 'success' : 'primary'}
            startIcon={isOnFinalStep && <CheckCircleRoundedIcon />}
          >
            {isOnFinalStep ? 'Finish' : 'Next'}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export { NewImageDialog };
