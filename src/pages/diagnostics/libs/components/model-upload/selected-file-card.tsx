import { HighlightedIcon } from '@/libs/components';
import { bytesToMb } from '@/libs/helpers';
import { CloseRounded } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

type SelectedFileCardProps = {
  name: string;
  sizeBytes: number;
  onRemoveFile: () => void;
};

const SelectedFileCard = (props: SelectedFileCardProps) => {
  const { onRemoveFile, name, sizeBytes } = props;

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" gap={2}>
        <HighlightedIcon
          rounded
          iconElement={
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="23px"
              width="23px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M14 4.5V14a2 2 0 0 1-2 2H6v-1h6a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.113 14.82.8 15.85H0l1.342-3.999h.926l1.336 3.999h-.841l-.314-1.028H1.113Zm1.178-.588-.49-1.617h-.034l-.49 1.617zm2.425-2.382v3.999h-.791V11.85h.79Z"
              ></path>
            </svg>
          }
        />
        <Stack>
          <Typography fontWeight={500} fontSize={14}>
            {name}
          </Typography>
          <Typography variant="caption">
            {bytesToMb(sizeBytes).toFixed(2)} MB
          </Typography>
        </Stack>
        <Box sx={{ marginLeft: 'auto' }}>
          <Tooltip title="Remove file">
            <IconButton
              onClick={onRemoveFile}
              sx={{ color: ({ palette }) => palette.neutral.dark }}
            >
              <CloseRounded />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Paper>
  );
};

export { SelectedFileCard };
