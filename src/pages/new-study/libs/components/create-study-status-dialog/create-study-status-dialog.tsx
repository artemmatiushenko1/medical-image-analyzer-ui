import { CheckRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { styles } from './styles';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/libs/enums';

const CreateStudyStatusDialog = () => {
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useQuery(
    'create-study',
    () => new Promise((resolve) => setTimeout(() => resolve(undefined), 2000)),
  );

  const handleOkClick = () => {
    navigate(AppRoute.STUDIES);
  };

  const getLoadingTypography = () => {
    return (
      <Stack textAlign="center">
        <Typography variant="h6">Creating new study...</Typography>
        <Typography variant="caption">It might take a moment.</Typography>
      </Stack>
    );
  };

  const getSuccessTypography = () => {
    return (
      <Stack textAlign="center">
        <Typography variant="h6">Study was successully created!</Typography>
        <Typography variant="caption">
          You can track the study status on the reports page.
        </Typography>
      </Stack>
    );
  };

  return (
    <Dialog open maxWidth="lg">
      <DialogContent sx={styles.dialogContent}>
        <Stack alignItems="center" gap={4}>
          {isLoading && (
            <>
              <CircularProgress size="45px" />
              {getLoadingTypography()}
            </>
          )}
          {isSuccess && (
            <>
              <Box sx={styles.successIconWrapper}>
                <CheckRounded fontSize="large" />
              </Box>
              {getSuccessTypography()}
              <Button variant="contained" onClick={handleOkClick}>
                Ok
              </Button>
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export { CreateStudyStatusDialog };
