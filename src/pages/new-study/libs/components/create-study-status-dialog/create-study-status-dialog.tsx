import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/app';
import { useCreateStudy } from '@/packages/studies';
import { Dialog, SuccessCheckmark } from '@/libs/components';

const CreateStudyStatusDialog = () => {
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useCreateStudy();

  const handleOkClick = () => {
    navigate(AppRoute.HOME);
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
      <Dialog.Content sx={styles.dialogContent}>
        <Stack alignItems="center" gap={4}>
          {isLoading && (
            <>
              <CircularProgress size="45px" />
              {getLoadingTypography()}
            </>
          )}
          {isSuccess && (
            <>
              <SuccessCheckmark />
              {getSuccessTypography()}
              <Button variant="contained" onClick={handleOkClick}>
                Ok
              </Button>
            </>
          )}
        </Stack>
      </Dialog.Content>
    </Dialog>
  );
};

export { CreateStudyStatusDialog };
