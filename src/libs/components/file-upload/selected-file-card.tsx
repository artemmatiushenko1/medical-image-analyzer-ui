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
import { AiModelIcon } from '../icons';

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
        <HighlightedIcon rounded iconElement={<AiModelIcon />} />
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
