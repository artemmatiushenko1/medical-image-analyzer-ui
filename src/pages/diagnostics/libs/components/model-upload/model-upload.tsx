import { Button, Dialog, DropArea, HighlightedIcon } from '@/libs/components';
import { MimeType } from '@/libs/enums';
import { CloseRounded, UploadFileRounded } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const ModelUpload = () => {
  return (
    <>
      <Dialog.Content sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" gutterBottom>
              Model name
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Enter model name"
            />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="subtitle2">Upload model file</Typography>
            <DropArea
              supportedFormats={[MimeType.HDF5]}
              icon={UploadFileRounded}
              previewImageSrc=""
              onUpload={() => {}}
              maxFileSizeMb={1000}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="subtitle2">Uploaded file</Typography>
            <Paper sx={{ p: 2 }}>
              <Stack direction="row" gap={2}>
                <HighlightedIcon
                  rounded
                  iconElement={
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      height="23px"
                      width="23px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14 4.5V14a2 2 0 0 1-2 2H6v-1h6a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.113 14.82.8 15.85H0l1.342-3.999h.926l1.336 3.999h-.841l-.314-1.028H1.113Zm1.178-.588-.49-1.617h-.034l-.49 1.617zm2.425-2.382v3.999h-.791V11.85h.79Z"
                      ></path>
                    </svg>
                  }
                />
                <Stack>
                  <Typography fontWeight={500} fontSize={14}>
                    SARS-CoV-2Analyzer.keras
                  </Typography>
                  <Typography variant="caption">25 MB</Typography>
                </Stack>
                <Box sx={{ marginLeft: 'auto' }}>
                  <IconButton
                    sx={{ color: ({ palette }) => palette.neutral.dark }}
                  >
                    <CloseRounded />
                  </IconButton>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Dialog.Content>
      <Dialog.Actions sx={{ padding: '20px 24px' }}>
        <Button variant="contained" color="success">
          Upload
        </Button>
      </Dialog.Actions>
    </>
  );
};

export { ModelUpload };
